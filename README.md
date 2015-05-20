# sort_lineup

Executable JavaScript.
Lightweight performance benchmarks of classic sorting algorithms.

This code loads no libraries. Sort algorithms are implemented in ES5, optimized for runtime speed performance.

Typical fastest-to-slowest results on large arrays of stochastic numerics:

Linearithmic sorts.
* Quicksort to within 30, then insertion sort
* Quicksort
* bottom-up merge sort - allocates O(n) extra memory
* heap sort
* top-down merge sort - allocates O(n) extra memory
* JavaScript sort

Elementary sorts.
* insertion sort
* selection sort
* bubble sort

Your results may vary. If you have many background processes running, and especially if you have browser windows open with animation-heavy images, you may get distorted results and out-of-sequence performance rankings.
