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

function tableFix(animal){
  if(animal == 'Duck'){
    $('table th').addClass('rowHead');
    $('table tr:nth-child(even)').addClass('rowEven');
    $('table tr:nth-child(odd)').addClass('rowOdd');
  }else if(animal == 'Fish'){
    $('table th').addClass('rowOver');
    $('table tr:nth-child(even)').addClass('rowA');
    $('table tr:nth-child(odd)').addClass('rowB');
  }
  //Use hand cursor on tables
  $('td').css({cursor: 'pointer'});

  //make table row links
  $('table tr').click(function(){
    var href = $(this).find('a').attr('href');
    if(href){
      window.open(href, '_blank');
    }
  });
  //make years look like links in duck page
  $('#duck_stories td:nth-child(odd)').css({
    color: '#0000EE',
    'text-decoration':'underline'
  });
}

function galleryFunc(){
  var firstImgPath = $('#gallery a').attr('href'); //grab the first image
  var altText = $('#gallery img').attr('alt'); //grab image alt text
  var firstImage = $('<figure id="galleryBig"><img src="'+ firstImgPath +'" alt="'+ altText + '"><figcaption>'+ altText +'</figcaption></figure>'); //create big first image with alt text and figure caption
  $('#gallery').after(firstImage); // place first image

  $('#gallery a').click(function(evt){
    evt.preventDefault(); // prevent default action
    oldImage = $('#galleryBig').children(':first'); //grab the first image
    var imgPath = $(this).attr('href'); // create path from img clicked on
    var newAlt = $(this).children().attr('alt'); // grab clicked img alt text
    $('figcaption').text(newAlt).remove().fadeIn(2000); //remove old figcap and add new figcap
    var newImage = $('<img src="' + imgPath + '" alt="'+ newAlt +'"><figcaption>'+ newAlt +'</figcaption>'); // create new image from clicked img with alt tex and fig caption
    newImage.hide(); //hide the previous image
    $('#galleryBig').prepend(newImage); //add image to end of big gallery
    newImage.fadeIn(2000); //fade new image in
    oldImage.remove(); //remove previous image
  });
}

function contactForm(){
  var elements = $('#fname, #lname, #fullname');

  elements.focus(function(){
    var defVal = $(this).prop('defaultValue') //get def val for item selected
    var curVal = $(this).val(); //get current val for item selected
    if(defVal == curVal){
      $(this).val('');
    } //end if statement comparing vals and making val blank when selected
  }); //end focus anon func

  elements.blur(function(){
    if($(this).val() == ''){
      $(this).val($(this).prop('defaultValue'));
    }
  }); //end blur anon func
  
  // datepicker options
  var dateOpts = {
    changeYear: true,
    changeMonth: true,
    dateFormat : 'mm/dd/yy',
    maxDate: 0
  }
  $('#date').datepicker(dateOpts);
  $('#sightingdate').datepicker(dateOpts);

}

function dragDrop(animal){
  // var url = window.location.href; //grab full URL
  // var projLink = url.substr(url.lastIndexOf('project') + 10) //grab current page
  // var animalName = projLink.startsWith(animal); //grab and verify project Name
  var dropHighlightClass;
  if(animal == 'Duck'){
    dropHighlightClass = 'dropHighlight';
  }else if(animal== 'Fish'){
    dropHighlightClass = 'highlightFishTargets'
  }

  $('.draggable').draggable({cursor: 'move', revert: true, zIndex: 100});
  $('.droppable').droppable({
    classes: {
      'ui-droppable-active': dropHighlightClass
    },
    tolerance: 'touch',
    drop: function(event, ui){
      var dropClass = $(this).attr('id');
      var dragClass = ui.helper.attr('id');
      if(dropClass == 'aquarium' && dragClass == 'fish' || dropClass == 'formPond' && dragClass == 'formDuck'){
       $('form').submit();
      }
    }
  });
}

function movieSearch(animal){
  var url = "https://api.nytimes.com/svc/movies/v2/reviews/search.json";
  url += '?' + $.param({
  'api-key': "3f72907d78fc4363a3c68fedc856d799",
  'query': animal,
  });
  $.getJSON(url, displayResults);
}

function displayResults(dataFromServer){
  var location = window.location.href;
  if(location.includes('media')){
    $('#content').append('<ol id="resultsList"></ol>')
    var results = dataFromServer.results;
    var count = results.length;
    $.each(results, function(resultsIndex, resultsValue){
    var title = resultsValue.display_title;
    var rating = resultsValue.mpaa_rating;
    var summary = resultsValue.summary_short;
    var openDate = resultsValue.opening_date;
    var link = resultsValue.link.url;
    var movieString = title + ' rating: ' + rating;
    movieString += '<br>' + openDate + '<br>' + summary + '<br><a href="' + link + '"target=_blank">' + link + '</a>';
    var li = '<li>' + movieString + '</li>';
    $('#resultsList').append(li);
  });
  $('p').append('<p>Showing ' + count + ' movies');
  }else if(location.includes('movies')){
    $('#mainContent').append('<ol id="resultsList"></ol>')
    var results = dataFromServer.results;
    var count = results.length;
    $.each(results, function(resultsIndex, resultsValue){
      var title = resultsValue.display_title;
      var rating = resultsValue.mpaa_rating;
      var summary = resultsValue.summary_short;
      var openDate = resultsValue.opening_date;
      var link = resultsValue.link.url;
      var movieString = title + ' rating: ' + rating;
      movieString += '<br>' + openDate + '<br>' + summary + '<br><a href="' + link + '"target=_blank">' + link + '</a>';
      var li = '<li>' + movieString + '</li>';
      $('#resultsList').append(li);
      console.log($('li').size)
    });// end each fund
    $('p').append('<p>Showing ' + count + ' movies');
  }
}