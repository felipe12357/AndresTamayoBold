export function getNumberToformatDate(val:number):string {
    return  new Date(val).toLocaleString('es-ES', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric', 
        hour: '2-digit', 
        hour12: false 
    }).replace(',','-');
}