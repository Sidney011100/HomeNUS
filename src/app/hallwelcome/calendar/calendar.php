<?php
$your_google_calendar="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=Asia%2FSingapore&amp;src=aG9tZW51czIwMjBAZ21haWwuY29t&amp;src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;src=NWxwcTQ3Zm5naGJ2N2EwMGFkdjNsNjhmZzhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%23039BE5&amp;color=%2333B679&amp;color=%23616161";

$url= parse_url($your_google_calendar);
$google_domain = $url['scheme'].'://'.$url['host'];

// Load and parse Google's raw calendar
$dom = new DOMDocument;
$dom->loadHTMLfile($your_google_calendar);

// Create a link to a new CSS file called schedule.min.css
$element = $dom->createElement('link');
$element->setAttribute('type', 'text/css');
$element->setAttribute('rel', 'stylesheet');
$element->setAttribute('href', '/css/schedule.min.css');

// Change Google's JS file to use absolute URLs
$scripts = $dom->getElementsByTagName('script');

foreach ($scripts as $script) {
  $js_src = $script->getAttribute('src');
  
  if ($js_src) {
    $parsed_js = parse_url($js_src, PHP_URL_HOST);
    if (!$parsed_js) {
      $script->setAttribute('src', $google_domain . $js_src);      
    }
  }
}

 // Append this link at the end of the element
$head = $dom->getElementsByTagName('head')->item(0);
$head->appendChild($element);

// Remove old stylesheet
$oldcss = $dom->documentElement;
$link = $oldcss->getElementsByTagName('link')->item(0);
$head->removeChild($link);

// Export the HTML
echo $dom->saveHTML();
?>