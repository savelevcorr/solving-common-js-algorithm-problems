import swap from './swap';

/**
 * Pivot helper
 * - Grab the pivot from the start of the array
 * - Store the current index of pivot in a variable (this will track of where the pivot should end up)
 * - Loop through the array from the start unitl the end
 *      - If the pivot is greater then the current value, increment the pivot index variable and swap
 *        the current element with the element at the pivot index
 * - Swap the starting element (i.e. the pivot) with the pivot index
 * - Return the pivot index
 * @param arr {array}
 * @param startIndex {number} 
 * @param endIndex? Helps when the function calls recursively {number}
 * @returns {number}
 */
const pivot = function (arr: number[], startIndex = 0, endIndex?: number): number {
    let pivot: number = arr[startIndex];
    let swapIndex: number = startIndex;

    for (let i: number = startIndex + 1; i < arr.length; i++) {
        if (pivot > arr[i]) {
            swapIndex += 1;
            swap(arr, swapIndex, i);
        }
    }

    swap(arr, swapIndex, startIndex);

    return swapIndex;
}

export default pivot;