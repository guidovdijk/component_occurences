const anychart = require('anychart')

const rows = [
  {
      "name": "Icon",
      "value": 56
  },
  {
      "name": "TextBlock",
      "value": 35
  },
  {
      "name": "Tab",
      "value": 26
  },
  {
      "name": "Input",
      "value": 25
  },
  {
      "name": "Button",
      "value": 18
  },
  {
      "name": "Header",
      "value": 17
  },
  {
      "name": "Bottom",
      "value": 15
  },
  {
      "name": "Title",
      "value": 12
  },
  {
      "name": "Title",
      "value": 12
  },
  {
      "name": "Title",
      "value": 12
  },
  {
      "name": "Title",
      "value": 12
  },
  {
      "name": "Label",
      "value": 11
  },
  {
      "name": "Circle",
      "value": 11
  },
  {
      "name": "InputWrapper",
      "value": 10
  },
  {
      "name": "Content",
      "value": 10
  },
  {
      "name": "TableCell",
      "value": 8
  },
  {
      "name": "Tooltip",
      "value": 8
  },
  {
      "name": "Description",
      "value": 7
  },
  {
      "name": "Section",
      "value": 7
  },
  {
      "name": "Description",
      "value": 7
  },
  {
      "name": "Description",
      "value": 7
  },
  {
      "name": "CreatorRow",
      "value": 7
  },
  {
      "name": "Description",
      "value": 7
  },
  {
      "name": "Avatar",
      "value": 6
  },
  {
      "name": "IconWrapper",
      "value": 6
  },
  {
      "name": "IconWrapper",
      "value": 6
  },
  {
      "name": "Indicator",
      "value": 6
  },
  {
      "name": "Author",
      "value": 6
  },
  {
      "name": "Indicator",
      "value": 6
  },
  {
      "name": "EmptyState",
      "value": 6
  },
  {
      "name": "IconWrapper",
      "value": 6
  },
  {
      "name": "IconWrapper",
      "value": 6
  },
  {
      "name": "Line",
      "value": 6
  },
  {
      "name": "TabButton",
      "value": 6
  },
  {
      "name": "CardSubscriber",
      "value": 6
  },
  {
      "name": "BenefitsList",
      "value": 6
  },
  {
      "name": "TabButton",
      "value": 6
  },
  {
      "name": "TitleWrapper",
      "value": 5
  },
  {
      "name": "SubscriptionModal",
      "value": 5
  },
  {
      "name": "Meta",
      "value": 4
  },
  {
      "name": "Meta",
      "value": 4
  },
  {
      "name": "SegmentedControl",
      "value": 4
  },
  {
      "name": "Meta",
      "value": 4
  },
  {
      "name": "BenefitsListItem",
      "value": 4
  },
  {
      "name": "Tabs",
      "value": 4
  },
  {
      "name": "BackButton",
      "value": 3
  },
  {
      "name": "Footer",
      "value": 3
  },
  {
      "name": "IndicatorContainer",
      "value": 3
  },
  {
      "name": "BottomSheetBase",
      "value": 3
  },
  {
      "name": "IndicatorContainer",
      "value": 3
  },
  {
      "name": "CreatorRowButton",
      "value": 3
  },
  {
      "name": "BackWrapper",
      "value": 3
  },
  {
      "name": "SubscribeButton",
      "value": 3
  },
  {
      "name": "Footer",
      "value": 3
  },
  {
      "name": "SubscribeCaption",
      "value": 3
  },
  {
      "name": "Bio",
      "value": 3
  },
  {
      "name": "StyledAvatar",
      "value": 3
  },
  {
      "name": "BackButton",
      "value": 3
  },
  {
      "name": "BackWrapper",
      "value": 3
  },
  {
      "name": "SubscribeButton",
      "value": 3
  },
  {
      "name": "SubscribeCaption",
      "value": 3
  },
  {
      "name": "Logo",
      "value": 2
  },
  {
      "name": "ButtonWrapper",
      "value": 2
  },
  {
      "name": "LocationPicker",
      "value": 2
  },
  {
      "name": "NativePicker",
      "value": 2
  },
  {
      "name": "SliderIndicator",
      "value": 2
  },
  {
      "name": "Body",
      "value": 2
  },
  {
      "name": "CardCreator",
      "value": 2
  },
  {
      "name": "Cover",
      "value": 2
  },
  {
      "name": "EmptyWrapper",
      "value": 2
  },
  {
      "name": "PostWrapper",
      "value": 2
  },
  {
      "name": "CardPost",
      "value": 2
  },
  {
      "name": "ImageWrapper",
      "value": 2
  },
  {
      "name": "Duration",
      "value": 2
  },
  {
      "name": "Thumbnail",
      "value": 2
  },
  {
      "name": "Body",
      "value": 2
  },
  {
      "name": "IconTextWrapper",
      "value": 2
  },
  {
      "name": "IconButton",
      "value": 2
  },
  {
      "name": "StyledButton",
      "value": 2
  },
  {
      "name": "DetailHeader",
      "value": 2
  },
  {
      "name": "PostsText",
      "value": 2
  },
  {
      "name": "PostWrapper",
      "value": 2
  },
  {
      "name": "SubscriptionModalTabContent",
      "value": 2
  },
  {
      "name": "TabButtonText",
      "value": 2
  },
  {
      "name": "ContentWrapper",
      "value": 2
  },
  {
      "name": "BenefitListIconGroup",
      "value": 2
  },
  {
      "name": "BenefitsListItemTitle",
      "value": 2
  },
  {
      "name": "TabButtonText",
      "value": 2
  },
  {
      "name": "AvatarImage",
      "value": 1
  },
  {
      "name": "ButtonText",
      "value": 1
  },
  {
      "name": "ButtonContent",
      "value": 1
  },
  {
      "name": "DetailCover",
      "value": 1
  },
  {
      "name": "CoverImage",
      "value": 1
  },
  {
      "name": "InputElement",
      "value": 1
  },
  {
      "name": "InputInnerWrapper",
      "value": 1
  },
  {
      "name": "ErrorMessage",
      "value": 1
  },
  {
      "name": "Dropdown",
      "value": 1
  },
  {
      "name": "ElementWrapper",
      "value": 1
  },
  {
      "name": "InfoWrapper",
      "value": 1
  },
  {
      "name": "ActionWrapper",
      "value": 1
  },
  {
      "name": "Toggle",
      "value": 1
  },
  {
      "name": "Chevron",
      "value": 1
  },
  {
      "name": "BadgeLevel",
      "value": 1
  },
  {
      "name": "CircleBg",
      "value": 1
  },
  {
      "name": "HeadingContainer",
      "value": 1
  },
  {
      "name": "Backdrop",
      "value": 1
  },
  {
      "name": "ContainerContent",
      "value": 1
  },
  {
      "name": "AvatarContainer",
      "value": 1
  },
  {
      "name": "EmptyItem",
      "value": 1
  },
  {
      "name": "Divider",
      "value": 1
  },
  {
      "name": "BackInnerWrapper",
      "value": 1
  },
  {
      "name": "RightButtonWrapper",
      "value": 1
  },
  {
      "name": "CreatorDetailContainer",
      "value": 1
  },
  {
      "name": "CreatorDetailInnerContainer",
      "value": 1
  },
  {
      "name": "CreatorDetailWrapper",
      "value": 1
  },
  {
      "name": "CreatorDetailInnerBack",
      "value": 1
  },
  {
      "name": "CreatorDetailTitleWrapper",
      "value": 1
  },
  {
      "name": "CardLocked",
      "value": 1
  },
  {
      "name": "TitleRow",
      "value": 1
  },
  {
      "name": "AuthorWrapper",
      "value": 1
  },
  {
      "name": "StyledBlurView",
      "value": 1
  },
  {
      "name": "ShadowWrapper",
      "value": 1
  },
  {
      "name": "DurationText",
      "value": 1
  },
  {
      "name": "ThumbnailWrapper",
      "value": 1
  },
  {
      "name": "PlayWrapper",
      "value": 1
  },
  {
      "name": "HeaderRow",
      "value": 1
  },
  {
      "name": "DateText",
      "value": 1
  },
  {
      "name": "PlatformText",
      "value": 1
  },
  {
      "name": "PremiumText",
      "value": 1
  },
  {
      "name": "CreatorStatus",
      "value": 1
  },
  {
      "name": "IconWrapperRight",
      "value": 1
  },
  {
      "name": "RedButtonText",
      "value": 1
  },
  {
      "name": "SubscribeButtonWrapper",
      "value": 1
  },
  {
      "name": "Name",
      "value": 1
  },
  {
      "name": "BioWrapper",
      "value": 1
  },
  {
      "name": "BioUrl",
      "value": 1
  },
  {
      "name": "Circle1",
      "value": 1
  },
  {
      "name": "Circle2",
      "value": 1
  },
  {
      "name": "Circle3",
      "value": 1
  },
  {
      "name": "Circle4",
      "value": 1
  },
  {
      "name": "NotificationsList",
      "value": 1
  },
  {
      "name": "SubscriptionModalDescription",
      "value": 1
  },
  {
      "name": "SwitchWrapper",
      "value": 1
  },
  {
      "name": "CardSubscriberTitle",
      "value": 1
  },
  {
      "name": "CardSubscriberDescription",
      "value": 1
  },
  {
      "name": "SubscribedDescription",
      "value": 1
  },
  {
      "name": "CardSubscriberFooter",
      "value": 1
  },
  {
      "name": "BenefitsListIconBackground",
      "value": 1
  },
  {
      "name": "BenefitListIconGroupBackground",
      "value": 1
  },
  {
      "name": "UnsubscribeButton",
      "value": 1
  },
  {
      "name": "SubscribeCaptionTOSLink",
      "value": 1
  },
  {
      "name": "SvgWrapper",
      "value": 1
  },
  {
      "name": "CardImage",
      "value": 1
  },
  {
      "name": "CardSubscriberFiller",
      "value": 1
  },
  {
      "name": "CardSubscriberOverlay",
      "value": 1
  },
  {
      "name": "SubscribedCheck",
      "value": 1
  },
  {
      "name": "Check",
      "value": 1
  },
  {
      "name": "SubscribedTitle",
      "value": 1
  },
  {
      "name": "BottomWrapper",
      "value": 1
  },
  {
      "name": "TabsSwitch",
      "value": 1
  },
  {
      "name": "TabsWrapper",
      "value": 1
  }
]

anychart.onDocumentReady(function() {

  var data = {
    header: ["Component name", "Occurrences"],
    rows: rows.filter(r => r.value > 2)
  }
  // create the chart
  var chart = anychart.bar();

  // add data
  chart.data(data);
  chart.labels(true);


  // set the chart title
  chart.title("Instantly Component occurences");

  // draw
  chart.container("container");
  chart.draw();
});
