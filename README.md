# sort_lineup

Executable JavaScript.
Lightweight performance benchmarks of classic sorting algorithms.

This code loads no libraries. Sort algorithms are implemented in ES5, optimized for runtime speed performance.

Typical fastest-to-slowest results on large arrays of stochastic floating-point values:

Linearithmic sorts:

1. Quicksort to within 15, then insertion sort
2. Quicksort
3. bottom-up merge sort - allocates O(n) extra memory
4. heap sort
5. top-down merge sort - allocates O(n) extra memory
6. JavaScript sort

Elementary sorts:

1. insertion sort
2. selection sort
3. bubble sort

Your results may vary. If you have many background processes running, and especially if you have browser windows open with animation-heavy images, you may get distorted results and out-of-sequence performance rankings.
