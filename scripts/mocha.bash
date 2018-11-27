#!/usr/bin/env bash
set -e

_dirname="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "${_dirname}/common"

setup_reports_dir() {
    if [ ! -d "$project_root/txt_reports" ]; then
        mkdir "$project_root/txt_reports"
    fi
}

mocha_main() {
    echo "Running Mocha unit tests..."

    if [ "$mocha_out" ]; then
        npm run test:mocha > "$mocha_out"
    else
        npm run test:mocha
    fi
}

mocha_usage() {
    echo 'Usage: '"$prog"
    echo
    echo 'This script runs Mocha unit tests.'
    echo
    echo 'Flags:'
    echo '    -r    Generate txt report'
}

result_text() {
    if [ "$1" -eq 0 ]; then
        echo -e "${GREEN}Success!${NORMAL}"
    else
        echo -e "${RED}Error!${NORMAL}"
    fi
}

prog="$0"
mocha_out=""

while [ $# -gt 0 ]; do
    case "$1" in
        (-h) mocha_usage "$prog"; exit; ;;
        (-r) setup_reports_dir; mocha_out="txt_reports/report.txt"; shift; ;;
        (-*) err "$0: error - unrecognized option $1"; mocha_usage; exit 1;;
        (*)  fatal "Unreachable"; ;;
    esac
done

set +e
mocha_main
exit_code=$?
result_text "$exit_code"
exit "$exit_code"
