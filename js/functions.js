function faqAccord(){
  $('#faqs, #fishfaq').accordion({
    collapsible: true,
    active: true,
  });
  $('#secondPanel, #thirdPanel').accordion({
    collapsible: true,
    heightStyle: "content",
    active: false
  });
}