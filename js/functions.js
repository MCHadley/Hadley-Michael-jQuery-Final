function faqAccord(){
  $('#faqs, #fishfaq').accordion({
    collapsible: true,
    active: true,
    animate: 400
  });
  $('#secondPanel, #thirdPanel').accordion({
    collapsible: true,
    heightStyle: "content",
    active: false,
    animate: 400
  });
}

function navLinks(){
  var url = window.location.href; //grab full URL
  var link = url.substr(url.lastIndexOf('/') + 1); //get end of URL
  var projLink = url.substr(url.lastIndexOf('project') + 10) //grab current page
  var duckName = projLink.startsWith('Duck'); //grab and verify project Name
  
  //compare project name and apply correct current link class
  if(duckName == true){
    $('[href*="' + link + '"]').addClass("pageHighlight");  
  }else{
    $('[href*="' + link + '"]').addClass("currentLink");
    }
  
    $("a[href^='http://']").attr('target', '_blank'); // make external links open in new window/tab
}

function tableFix(){
  var url = window.location.href; //grab full URL
  var projLink = url.substr(url.lastIndexOf('project') + 10) //grab current page
  var duckName = projLink.startsWith('Duck'); //grab and verify project Name
  // compare project name and apply correct table striping class
  if(duckName == true){
    $('table th').addClass('rowHead');
    $('table tr:nth-child(even)').addClass('rowEven');
    $('table tr:nth-child(odd)').addClass('rowOdd');
  }else{
    $('table th').addClass('rowOver');
    $('table tr:nth-child(even)').addClass('rowA');
    $('table tr:nth-child(odd)').addClass('rowB');
  }
}