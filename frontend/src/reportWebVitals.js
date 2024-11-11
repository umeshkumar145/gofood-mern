/**
 * Reports web vitals using the provided callback function.
 * This function leverages web-vitals to capture core metrics like CLS, FID, FCP, LCP, and TTFB.
 * @param {function} onPerfEntry - Callback function to handle each performance entry metric.
 */
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

// Example usage (uncomment to test):
// reportWebVitals(console.log);

export default reportWebVitals;
