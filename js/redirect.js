(function () {
  var REDIRECTS = {
    "/2024-General-Course": "/license-courses/",
    "/W2TQF_Scholarship": "/scholarship/",
    "/content/about-fulton-amateur-radio-club": "/about/",
    "/content/license-courses": "/license-courses/",
    "/content/christmas-party-2013": "/events/christmas-party/",
    "/content/club-christmas-party-1": "/events/christmas-party/",
    "/content/club-christmas-party-2": "/events/christmas-party/",
    "/content/club-christmas-party-2016": "/events/christmas-party/",
    "/content/club-christmas-party": "/events/christmas-party/",
    "/content/club-picnic-1": "/events/club-picnic/",
    "/content/club-picnic": "/events/club-picnic/",
    "/content/field-day-2008": "/events/field-day/",
    "/content/field-day-2013": "/events/field-day/",
    "/content/field-day-2016-1": "/events/field-day/",
    "/content/field-day-2017": "/events/field-day/",
    "/content/open-house": "/events/open-house/",
    "/event-types/club-gatherings": "/events/",
    "/newsletter": "/newsletter/",
    "/node/2": "/meetings/",
    "/node/174": "/meetings/174/",
    "/node/175": "/meetings/175/",
    "/node/177": "/meetings/177/",
    "/node/178": "/meetings/178/",
    "/node/179": "/meetings/179/",
    "/node/180": "/meetings/180/",
    "/node/181": "/meetings/181/",
    "/node/182": "/meetings/182/",
    "/node/183": "/meetings/183/",
    "/node/184": "/meetings/184/",
    "/node/185": "/meetings/185/",
    "/node/203": "/meetings/203/",
    "/node/204": "/meetings/204/",
    "/node/205": "/meetings/205/",
    "/node/206": "/meetings/206/",
    "/node/207": "/meetings/207/",
    "/node/208": "/meetings/208/",
    "/node/209": "/meetings/209/",
    "/node/210": "/meetings/210/",
    "/node/215": "/meetings/215/",
    "/node/216": "/meetings/216/",
    "/node/217": "/meetings/217/",
    "/node/218": "/meetings/218/",
    "/node/219": "/meetings/219/",
    "/node/224": "/meetings/224/",
    "/photo-gallery": "/events/",
    "/photo-gallery/club-events": "/events/",
    "/photo-gallery/club-gatherings": "/events/club-picnic/",
    "/photo-gallery/field-day": "/events/field-day/",
    "/photo-gallery/open-house": "/events/open-house/",
    "/photo-gallery/other": "/events/",
    "/races": "/races/",
    "/repeaters": "/repeaters/",
    "/skywarn": "/skywarn/",
    "/taxonomy/term/46": "/archive/newsletter/",
    "/taxonomy/term/46/feed": "/archive/newsletter/feed.xml",
    "/web-links": "/web-links/"
  };

  var path = window.location.pathname.replace(/\/$/, '');
  var search = window.location.search;
  var key = path + search;
  var dest = REDIRECTS[key] || REDIRECTS[path];
  if (dest) {
    window.location.replace(dest);
  }
})();
