import * as $ from "jquery";
import Cookies from "js-cookie";
import { checkIfFeatureEnabled } from "../../core/options/options_storage";

checkIfFeatureEnabled("sortBadges").then((result) => {
  if (result && $("a.pureCssMenui0 span.person").text() == Cookies.get("wikitree_wtb_UserName")) {
    import("./sortBadges.css");
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if ($("body.page-Special_Badges").length && (urlParams.has("u") || localStorage.savedBadges)) {
      $("div.sixteen.columns p")
        .eq(0)
        .append(
          $(
            "<menu id='clubBadgeButtons'><button class='small' id='hideClubBadges'>Hide Club Badges</button><button id='moveClubBadgesDown' class='small'>Move Club Badges Down</button></menu>"
          )
        );
      $("#hideClubBadges").on("click", (e) => {
        e.preventDefault();
        hideClubBadges();
      });
      $("#moveClubBadgesDown").on("click", (e) => {
        e.preventDefault();
        moveClubBadgesDown();
      });

      if (localStorage.savedBadges) {
        localStorage.removeItem("savedBadges");
        window.location = $("a.pureCssMenui0 span.person").parent().attr("href");
      }
      if (urlParams.has("badgeAction")) {
        localStorage.setItem("savedBadges", 1);
        $("#" + urlParams.get("badgeAction")).trigger("click");
        localStorage.removeItem("sortBadges");
      }
    }
    if (
      $("body.profile").length &&
      window.location.href.match("Space:") == null &&
      $("a.pureCssMenui0 span.person").text() == Cookies.get("wikitree_wtb_UserName")
    ) {
      $("a:contains('view/edit')")
        .parent()
        .after(
          $(
            '<span class="SMALL" style="background: none;" id="hideClubBadgesLink">[<a href="/index.php?title=Special:Badges&amp;u=' +
              Cookies.get("wikitree_wtb_UserID") +
              '&badgeAction=hideClubBadges">hide Club badges</a>] </span>'
          )
        );
    }
  }
});

function saveBadgeChanges() {
  $("input[value='Save Display Changes']").trigger("click");
}

function hideClubBadges() {
  const clubBadgeLinks = $("a[href$='club100'],a[href$='club1000']");
  clubBadgeLinks.each(function () {
    $(this).closest("li").find("input[name^='hide']").prop("checked", "true");
  });
  saveBadgeChanges();
}

function moveClubBadgesDown() {
  const clubBadgeLinks = $("a[href$='club100'],a[href$='club1000']");
  clubBadgeLinks.each(function () {
    $(this).closest("li").appendTo($(this).closest("ul"));
  });
  const idArray = [];
  $("#list_items li").each(function () {
    idArray.push($(this).attr("id"));
  });
  $("#new_order").val(idArray.join(","));
  saveBadgeChanges();
}
