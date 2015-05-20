# sort_lineup

Executable JavaScript.
Lightweight performance benchmarks of classic sorting algorithms.

This code loads no libraries. Sort algorithms are implemented in ES5, optimized for runtime speed performance.

Typical fastest-to-slowest results on large arrays of stochastic numerics:

Linearithmic sorts.
* inser25Quicksort
* quicksort
* bottomUpMergeSort - allocates O(n) extra memory
* heapsort
* topDownMergeSort - allocates O(n) extra memory
* javascriptSort

Elementary sorts.
* bubbleSort
* selectionSort
* insertionSort

Your results may vary. If you have many background processes running, and especially if you have browser windows open with animation-heavy images, you may get extremely distorted results and unusual results rankings.
