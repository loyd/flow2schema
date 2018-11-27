#!/usr/bin/env bash
set -e

_dirname="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

source "${_dirname}/common"

_flow_bin="$project_root/node_modules/.bin/flow"

setup_reports_dir() {
    if [ ! -d "$project_root/txt_reports" ]; then
        mkdir "$project_root/txt_reports"
    fi
}

typecheck_main() {
    echo "Running flow type checker..."

    if [ "$typecheck_out" ]; then
        "$_flow_bin" "$@" > "$typecheck_out"
    else
        "$_flow_bin" "$@"
    fi
}

typecheck_usage() {
    echo 'Usage: '"$prog" '[options]'
    echo
    echo 'This script runs project flow type checker.'
    echo
    echo 'Options:'
    echo '    -h                         Show this help'
    echo '    -r                         Generate txt report'
}

result_text() {
    if [ "$1" -eq 0 ]; then
        echo -e "${GREEN}Success!${NORMAL}"
    else
        echo -e "${RED}Error!${NORMAL}"
    fi
}

prog="$0"
typecheck_arg=''
typecheck_out=''

while [ $# -gt 0 ]; do
    case "$1" in
    (-h)
        typecheck_usage
        exit
        ;;
    (-r)
        setup_reports_dir;
        typecheck_arg+=" --show-all-errors --strip-root --max-warnings 0"
        typecheck_out='txt_reports/report.txt'

        echo 'Using txt reporter.'
        shift
        ;;
    (-*)
        err "$0: error - unrecognized option $1"
        typecheck_usage
        exit 1
        ;;
    (*)
        fatal "Unreachable"
        ;;
    esac
done

set +e
typecheck_main $typecheck_arg
exit_code=$?
result_text "$exit_code"
exit "$exit_code"
