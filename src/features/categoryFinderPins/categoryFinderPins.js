import $ from "jquery";
import { checkIfFeatureEnabled } from "../../core/options/options_storage";

async function addCategoryLinksToDropdown() {
  $("#addCategoryInput").keyup(function () {
    setTimeout(function () {
      $(".autocomplete-suggestions:visible .autocomplete-suggestion").each(function () {
        const term = $(this).text();
        const pin = $(
          "<span class='autocomplete-suggestion-maplink'><a target='_new' href='https://www.wikitree.com/wiki/Category:" +
            term +
            "'><img src='" +
            chrome.runtime.getURL("images/newTab.png") +
            "'></a></span>"
        );
        if ($(this).prev("span").length == 0) {
          pin.insertBefore($(this));
        }
      });
    }, 1000);
  });
}

checkIfFeatureEnabled("categoryFinderPins").then((result) => {
  if (result) {
    setTimeout(function () {
      addCategoryLinksToDropdown();
    }, 1000);
  }
});
