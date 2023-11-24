    /* Countdown seconds */
var count = 3;
/* Website to redirect */
var url = "/";
/* Call function at specific intervals */
var countdown = setInterval(function() { 
    /* Display Countdown with txt */
    jQuery('#displayTimer').text("Redirecting You: " + count-- + " seconds");
    /* If count is smaller than 0 ...*/
    if (count < 0) {
        jQuery('#displayTimer').text("Redirecting now....");
        /* Clear timer set with setInterval */
        clearInterval(countdown);
        /* Redirect */
        jQuery(location).attr("href", url);
   } 
    // milliseconds
}, 1000);