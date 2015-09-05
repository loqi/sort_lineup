// Famous sort algorithms in JavaScript 5
// Implementation by Park Loqi - github.com/loqi
// Running this script will create a large array of pseudorandom
// numbers and then run each of the sorting algorithms against
// this array, comparing runtime performance.
//
// These sort algorithms are optimized for runtime speed.
// Similar algorithms contain repeated code to compare
// runtime-optimized code, rather than to write it DRY.

var sampleSizeAr =
  [    10 ,    20 ,    30 ,    40 ,    50 ,    60 ,    70 ,    80 ,    90
  ,   100 ,   200 ,   300 ,   400 ,   500 ,   600 ,   700 ,   800 ,   900
  ,  1000 ,  2000 ,  3000 ,  4000 ,  5000 ,  6000 ,  7000 ,  8000 ,  9000
  , 10000 , 20000 , 30000 , 40000 , 50000 , 60000 , 70000 , 80000 , 90000
  ,   1e5 ,   2e5 ,   3e5 ,   4e5 ,   5e5 ,   6e5 ,   7e5 ,   8e5 ,   9e5
  ,   1e6 ,   2e6 ,   3e6 ,   4e6 ,   5e6 ,   6e6 ,   7e6 ,   8e6 ,   9e6
  // ,   1e7 ,   2e7 ,   3e7
  ];
var leaderboard = {}; // { string_name_of_algorithm : [ records_sorted , ms_consumed ] , ..}
var temp;             // defined in closure so it's always ready to go for swaps.

// Elementary sort algorithms: quadratic time ------------------------------

// BUBBLE SORT (stable sort)
// Time complexity O(n^2) Space complexity O(1)
// Disadvantage: very slow run time.
// Advantage: Simple code.
//
// Triangular execution pattern. Sorted region grows at one end of the array
// from zero length until it covers the whole array. Inner loop walks the unsorted
// region forward (or backward) swapping out-of-sequence neigboring pairs. Each
// walk "bubbles"" rabbits far in the direction of the walk and turtles slightly
// backward. At the completion of a walk, there will be one more rabit in its
// rightful position, growing the sorted region by one element.
function bubbleSort(ar) {
  var i, j, lim;
  lim = ar.length ; while (lim--) {
    for (i = 0, j = 1 ; i < lim ; ++i, ++j)
      if (ar[i] > ar[j]) { temp = ar[i];  ar[i] = ar[j];  ar[j] = temp; }
  }
  return ar;
}

// SELECTION SORT (stable sort)
// Time complexity O(n^2) Space complexity O(1)
// Disadvantage: no speed gain with somewhat sorted input
// Advantage: fairly obvious to create.
//
// Triangular execution pattern. Inner loop walks the unsorted region forward (or
// backward) identifying the lowest (or highest) unsorted element. Sorted region
// begins length zero at one end, growing by the identified element until the
// whole thing is sorted.
function selectionSort(ar) {
  var i, j, minIx, minVal;
  for (i = 0 ; i < ar.length ; ++i) {
    minVal = ar[  minIx = i  ];
    for (j = i+1 ; j < ar.length ; ++j) { ar[j] < minVal &&( minVal = ar[  minIx = j  ] ); }
    temp = ar[i];  ar[i] = ar[minIx];  ar[minIx] = temp;
  }
  return ar;
}

// INSERTION SORT (stable sort)
// Time complexity O(n^2) Space complexity O(1)
// Advantage: less work per element. Less work for nearly sorted input.
//
// Triangular execution pattern. Sorted region grows from length 1 to entire array.
// Outer loop picks up the unsorted element at interface between sorted and unsorted;
// inner loop walks sorted region to identify where that element belongs. Inner loop
// shifts elements as it walks until it finds the new home.
function insertionSort(ar) {
  var i, j, k, val, lim=ar.length;
  for (i=1 ; i<lim ; ++i) {
    val = ar[  j = i  ];   k = j-1;
    while (j && ar[k]>val)  ar[j--] = ar[k--];
    ar[j] = val;
  }
  return ar;
}

// // Quasi-linear time complexity algorithms below.

// TOP-DOWN MERGE SORT (stable sort)
// Time complexity O(n log n) Space complexity O(n log n) due to recursively saving copies
// Copies left and right halves of array and recursively merge-sorts them.
// Merges these two sorted half-length arrays into original elements of `ar`.
function topDownMergeSort(ar) {
  if (ar.length < 2) return ar;
  var lefLen = Math.floor(ar.length/2);
  var lefAr = topDownMergeSort(ar.slice(0, lefLen));
  var rigAr = topDownMergeSort(ar.slice(lefLen));
  var lefIx = 0, rigIx = 0, merIx = 0;
  while (lefIx < lefAr.length && rigIx < rigAr.length)
    { ar[merIx++] = lefAr[lefIx] <= rigAr[rigIx] ? lefAr[lefIx++] : rigAr[rigIx++]; }
  while (lefIx < lefAr.length) ar[merIx++] = lefAr[lefIx++];
  while (rigIx < rigAr.length) ar[merIx++] = rigAr[rigIx++];
  return ar;
}

// BOTTOM-UP MERGE SORT (stable sort)
// Time complexity O(n log n) Space complexity O(n)
// Copies entire `ar` to a buffer.
// Alternately merges between temporary buffer and original array.
// Merges all pairs of singles to doubles, then all pairs of doubles to quads,
// and so on. Final pass is guaranteed to be written into original array.
function bottomUpMergeSort(ar) {
  if (ar.length < 2) return;
  var mergeCount = log2Ceil(ar.length);
  var buf = ar.slice(0);
  if (mergeCount%2) { temp=ar; ar=buf; buf=temp; }
  var lef0, rig0, off0, lefIx, rigIx, merIx;
  var segLen = 1, dubSeg = 2;
  while (mergeCount--) {
    temp=ar;  ar=buf;  buf=temp;
    for (lef0 = 0; lef0 < ar.length ; lef0 += dubSeg) {
      merIx = lefIx = lef0;
      rigIx = rig0 = Math.min( ar.length , lef0+segLen );
      off0  =        Math.min( ar.length , rig0+segLen );
      while (lefIx < rig0 && rigIx < off0)
        { ar[merIx++] = buf[lefIx] <= buf[rigIx] ? buf[lefIx++] : buf[rigIx++]; }
      while (lefIx < rig0) ar[merIx++] = buf[lefIx++];
      while (rigIx < off0) ar[merIx++] = buf[rigIx++];
    }
    segLen=dubSeg, dubSeg*=2;
  }
  return ar;
}

// JAVASCRIPT SORT (non-stable sort)
// Time complexity O(n log n) Space complexity O(log n)
// JavaScript V8 implementation uses quicksort and insertion sort
function javascriptSort(ar) {
  return ar.sort( function(a,b){return a-b;} );
}

// QUICKSORT (non-stable sort)
// Time complexity O(n log n) Space complexity O(log n)
// Selects one pivot element of `ar` and then partitions all lesser
// elements to the left of that pivot and greater elements to the right,
// with pivot landing it its rightful position. Recursively quicksorts
// the left partition and then the right partition.
var qsPartition; // Closure variable pointing to prefered Quicksort partition function.
function quicksortForward(ar) {
  qsPartition = qsPartitionForward;
  return qSort(ar, 0, ar.length-1), ar;
}
function quicksortInward(ar) {
  qsPartition = qsPartitionInward;
  return qSort(ar, 0, ar.length-1), ar;
}

// INSERTION-25 QUICKSORT (non-stable sort)
// Time complexity O(n log n) Space complexity O(log n)
// Performs quicksort on the array, recursing down to segments of length
// 20 or shorter, and performs insertion sort on these short segments.
function inser15Quicksort(ar) {
  return iqSort(ar, 0, ar.length-1, 15), ar;
}

// HEAP SORT (non-stable sort)
// Time complexity O(n log n) Space complexity O(n)
// Builds a max-heap in place in the array. Then progressively swaps the top of the
// heap with the bottom, which makes the heap area shrink while the sorted area grows
// until the heap is gone.
function heapsort(ar) {
  var heapLen;
  // Assume ar[0..riserIx-1] is a heap. Rises ar[riserIx] to its rightful position.
  function rise(riserIx){
    var sinkerIx;
    while (riserIx) {
      sinkerIx = Math.floor((riserIx-1)/2);
      if (ar[sinkerIx] >= ar[riserIx]) return;
      temp=ar[riserIx]; ar[riserIx]=ar[sinkerIx]; ar[  riserIx = sinkerIx  ]=temp;
    }
  }
  // Assume ar[sinkerIx+1..] is a heap. Sinks ar[sinkerIx] to its rightful position.
  function sink(sinkerIx){
    var childIx, riserIx;
    while ((  childIx = sinkerIx*2+1  )<heapLen) {
      riserIx = ar[sinkerIx]<ar[childIx] ? childIx : sinkerIx ;
      (++childIx)<heapLen && ar[riserIx]<ar[childIx] &&( riserIx = childIx  );
      if (riserIx===sinkerIx) return;
      temp=ar[sinkerIx]; ar[sinkerIx]=ar[riserIx]; ar[  sinkerIx=riserIx  ]=temp;
    }
  }
  // Build top-heavy heap of `ar` in place.
  for ( heapLen = 1 ; heapLen < ar.length ; ++heapLen) rise(heapLen);
  // Grow sorted array at end of `ar` while shrinking heap at front of `ar`
  while (--heapLen) {
    temp=ar[0]; ar[0]=ar[heapLen]; ar[heapLen]=temp;
    sink(0);
  }
  return ar;
}

// HELPER METHODS ------------------------------

function log2Ceil(x) { return Math.ceil( Math.log(x) / Math.LN2 ); }

// Performs quicksort on array segment ar[lo..hi]
function qSort(ar, lo, hi) {
  if (hi <= lo) return;
  var pivIx = qsPartition(ar, lo, hi);
  qSort(ar, lo, pivIx-1);
  qSort(ar, pivIx+1, hi);
}

// sorts array segment ar[lo..hi] using insertion sort when
// segment is shorter than `mesh` or quicksort when longer.
function iqSort(ar, lo, hi, mesh) {
  if (hi < lo+mesh) {
    var i, j, k, val;
    for (i = lo+1 ; i <= hi ; ++i) {
      val = ar[  j = i  ];   k = j-1;
      while (j && ar[k]>val)  ar[j--] = ar[k--];
      ar[j] = val;
    }
    return;
  }
  var pivIx = qsPartition(ar, lo, hi);
  iqSort(ar, lo, pivIx-1, mesh);
  iqSort(ar, pivIx+1, hi, mesh);
}

// Chooses pivot in ar[lo..hi]. Partitions elements around it. Returns pivot's final index.
// This flavor of partition scans toward the middle from both ends, swapping any out-of-place elements.
function qsPartitionInward(ar, lo, hi) {
  var i, j, pivVal;
  pivVal = ar[  i = choosePiv(ar, lo, hi)  ];
  ar[i] = ar[hi];   ar[hi] = pivVal;
  i = lo;   j = hi-1;
  while (true) {
    while (ar[i] < pivVal)  ++i;
    while (i < j && ar[j] > pivVal)  --j;
    if (j <= i) break;
    temp = ar[i];  ar[i++] = ar[j];  ar[j--] = temp;
  }
  ar[hi] = ar[i];   ar[i] = pivVal;
  return i;
}

// Chooses pivot in ar[lo..hi]. Partitions elements around it. Returns pivot's final index.
// This flavor of partition scans ar[lo..hi], tossing backward any elements that belong left of pivot.
function qsPartitionForward(ar, lo, hi) {
  var i, j, pivVal;
  pivVal = ar[  i = choosePiv(ar, lo, hi)  ];
  ar[i] = ar[hi];   ar[hi] = pivVal;
  i = lo-1;   j = lo;
  while (++i < hi) {
    if (ar[i] < pivVal) {
      temp = ar[i];  ar[i] = ar[j];  ar[j++] = temp;
    }
  }
  ar[hi] = ar[j];   ar[j] = pivVal;
  return j;
}

// Chooses a pivot element and returns the index of that pivot element.
function choosePiv(ar, lo, hi) {
  // Identify indexes: middle element, random left-of-middle, random right-of-middle.
  var midIx = Math.floor((lo+hi)/2);
  var lefIx = Math.floor(Math.random()*(1+midIx-lo) + lo);
  var rigIx = Math.floor(Math.random()*(hi-midIx) + 1 + midIx);
  // Return index of the median of these three elements, bias toward midIx.
  return ( ar[lefIx]<=ar[midIx]
    ? (ar[midIx]<=ar[rigIx] ? midIx :(ar[lefIx]<ar[rigIx] ? rigIx : lefIx))
    : (ar[midIx]>=ar[rigIx] ? midIx :(ar[lefIx]>ar[rigIx] ? rigIx : lefIx))  );
}

// TEST CODE ------------------------------

var sortFuncTab =
  { // bubbleSort          : bubbleSort
//   , selectionSort       : selectionSort
//   , insertionSort       : insertionSort
//   , topDownMergeSort    : topDownMergeSort
//   , bottomUpMergeSort   : bottomUpMergeSort
//   , javascriptSort      : javascriptSort
//   ,
    quicksortForward           : quicksortForward
    ,quicksortInward : quicksortInward
  // , inser15Quicksort    : inser15Quicksort
  // , heapsort            : heapsort
  };
var sortNameAr  = Object.keys(sortFuncTab);

// Returns true unless a higher element is followed by a lower element.
function isAscending(ar){
  if (ar.length < 2) return true;
  var i = ar.length ; higherVal = ar[--i]; while (i--) {
    if (ar[i] > higherVal) return false;
    higherVal = ar[i];
  }
  return true;
}

// Load testAr with millions of pseudo-pseudo-random numbers 0.000 .. 0.999
console.log("Initializing random number array.");
var testArLen = sampleSizeAr[sampleSizeAr.length-1];
var testAr = [];
var x, y, resetAfter, i;
// Load testAr with a few thousand real pseudo-randoms
i = 100000 ; while (i--) { testAr.push( Math.random() ); }
// Append testAr with a few million more pseudo-pseudo-randoms.
// Prohibitively long run time to use Math.random so many times.
while (testAr.length < testArLen) {
  x = Math.floor(Math.random()*testAr.length);
  y = Math.floor(Math.random()*testAr.length);
  i = Math.min( testArLen-testAr.length , Math.floor(Math.random()*10000) );
  console.log('    ' + testArLen-testAr.length);
  // Append a few thousand (i) numbers generated from two walking indexes [x] and [y]
  while (i--) { testAr.push(testAr[y++]+testAr[x++] % 1); }
}

// Apply all the sort functions against copies of testAr of various lengths
var namIx, sampleSize, thisSortName, thisSortFunc, sortAr, time;
// Cycle thisSortName through each sort function name (String)
for (namIx = 0 ; namIx < sortNameAr.length ; ++namIx) { thisSortName = sortNameAr[namIx];
  console.log("\n\n");
  thisSortFunc = sortFuncTab[thisSortName];
  for (sampIx = 0 ; sampIx<sampleSizeAr.length ; ++sampIx) { sampleSize = sampleSizeAr[sampIx];
    sortAr = testAr.slice(0, sampleSize);
    time = Date.now();
    sortAr = thisSortFunc(sortAr);
    time = Date.now()-time;
    console.log(thisSortName+": "+sampleSize+" float64 numbers in "+time+" ms.");
    if (!isAscending(sortAr)) { console.log("    Incorrectly sorted results!"); }
    leaderboard[thisSortName] = [ sampleSize , time ];
    if (time > 3000) break; // Go until a run exceeds three seconds.
  }
}

// Build leaderboard summary and console.log it to the user
var summaryAr = Object.keys(leaderboard); // [ alg_name, ..]
for (i = 0 ; i<summaryAr.length ; i++) {
  summaryAr[i] = leaderboard[summaryAr[i]].concat([summaryAr[i]]);
} // [ [num_of_elements, num_of_ms, alg_name] , .. ]
summaryAr.sort( function(a,b){ return (a[0]===b[0]) ? a[1]-b[1] : b[0]-a[0]; });
console.log('\n\n');
for (i = 0 ; i<summaryAr.length ; i++) {
  console.log( '#'+(i+1)+' '+summaryAr[i][2]+"\t"+summaryAr[i][0]+' elements in '+
    summaryAr[i][1]+' ms. '+Math.round(summaryAr[i][0]/summaryAr[i][1])+' el/ms.' );
}
