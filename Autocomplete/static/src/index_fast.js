$(document).ready(initialize);

function initialize() {
  var tree = new WordTrie();
  tree.buildTrie(dictionary);
  let $input = $("#search-input");
  let $list = $("#match-list");
  let startDate = new Date();
  let stopDate = new Date();

  $input.on("input", function(event) {
    let matches = tree.getWordList(event.target.value, 6);

    if (matches && matches.length > 0) {
      $list.empty();
      // build an array of list items
      matches.forEach((el) => (
        $list.append(`<li class="list-result">${el}</li>`)
      ));
    } else {
      $list.empty();
    }
  });

  $list.on("click", function(event) {
    $input.val(event.target.innerText);
    $(this).empty();
  })
}
