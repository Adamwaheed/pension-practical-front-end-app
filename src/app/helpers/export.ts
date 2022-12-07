// declare navigator
declare var navigator: any;

export function exportToCSV(data: string, fileName: string): void {
    const blob = new Blob([data], {type: 'text/csv;charset=utf-8'});
    const url = window.URL.createObjectURL(blob);

    if (navigator?.msSaveOrOpenBlob) {
        navigator?.msSaveBlob(blob, fileName);
    } else {
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    window.URL.revokeObjectURL(url);
}
