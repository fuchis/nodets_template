/**
 * Implementacion de un comparador, en caso de ser strings, 
 * se transforman a mayusculas.
 * si son diferentes, retorna -1/1, dependiendo de quien tenga la jerarquia,
 * si son iguales devuelve 0
 * 
 * @param a elemento de entrada
 * @param b elemento a comparar
 * @returns -1(false), 1(true), 0(neutro)
 */
let compareTo = (a:any, b:any) => {
    
    if(typeof a === "string" && typeof b === "string"){
        a = a.toUpperCase();
        b = b.toUpperCase();
    }

    if(a<b) return -1;
    if(a>b) return 1;
    if(a==b) return 0;
}

/**
 * Implementación del algoritmo de busqueda binaria, 
 * para buscar en colecciones grandes, dividiendo la coleccion en partes
 * 
 * @param inputArray collecion a iterar
 * @param elementToFind elemento a encontrar
 * @param property propiedad con la que se va a comprar
 * @returns number, si encuentra el elemento, devuelve el indice, si no esta en la coleccion, retorna -1(false)
 */
let binarySearch = (inputArray:any[], elementToFind:any, property:string): number => {
    
    let inicio=0;
    let fin=inputArray.length-1;
         
    while (inicio<=fin){
 
        // Buscamos la mitad del array
        let mid=Math.floor((inicio + fin)/2);
        let element = inputArray[mid];
       
        // comparamos elemento del array con el elemento a buscar
        let cmp:any = compareTo(element[property], elementToFind);
        
        // indicamos para que lado se va a hacer la busqueda(izq o der)
        if (cmp < 0){
            inicio = mid +1;
        } else if(cmp > 0) {
            fin = mid - 1;
        } else{
            return mid;
        }
        
    }
    
    return -(inicio + 1)
}

/**
 * Array Sort de JS, cuando la coleccion es menor a 23 elementos, 
 * usar insertion Sort para ordenar, cuando es mayor a 23, 
 * usa Quicksort
 * 
 * @param array arreglo de entrada
 * @param key la propiedad por la que se va a ordenar
 * @returns arreglo ordenado
 */

const sortByKey = (array:any[], key:string) => {

    return array.sort(
        (a, b) => {
            if(a[key] < b[key]) return -1;
            if(a[key] > b[key]) return 1;
            return 0;
        }
    )
}

export const Search = {
    BinarySearch: binarySearch,
    SortByKey: sortByKey
}

