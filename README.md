# jeeebot

**Jeeebot** is a constants generator for XCode Projects that is written with Node.JS.

Using `NSString*` as a key easily cause serious misstake that is hard to find.
**Jeeebot** generates keys as constants so, Compiler can check this errors easiy.
XCode also prevent mistake and can suggest code completion with **Jeeebot**

**Jeeebot** can generate constants for:

* Localized String Keys for `.strings` files.
* Segue Identifiers from `.Stroyboard` files.
* Reuse Identifiers from `.Stroyboard` and `.xib` files.
* Named Image keys from `.asset` files.
* Entity names, attribute names and fetch requests from core data model definition.

**Jeeebot** can be used as cli tool or can be [integrated with XCode](https://github.com/jeeeyul/jeeebot/wiki/Integration-with-Xcode).

This project was started to use for my commercial ios projects.
I'v helped a lot from great open source communities about the developing ios apps.
Now I'm contributing my tool to pay back.

[![Build Status](https://travis-ci.org/jeeeyul/jeeebot.svg)](https://travis-ci.org/jeeeyul/jeeebot)


## Installation

You need to install [node](http://nodejs.org) to use jeeebot.

```bash
$ npm install jeeebot -g
```

```
$ jeeebot -h
Usage:
  jeeebot [OPTIONS] [ARGS]

Options: 
  -t, --type STRING           Generator type: segue | reuse | strings | asset | 
                              coredata | plist 
      --fieldStyle [STRING]   Field naming style: uppercase | camelcase  (Default is camelcase)
      --fieldPrefix [STRING]  Prefix for field name (Default is k)
  -c, --copyright [STRING]    Copyright (Default is Jeeeyul Lee<jeeeyul@gmail.com>)
  -o, --output PATH           Output file
  -h, --help                  Display help and usage details
```


## Keys for localized string

en.lproj/strings.strings:
```
# Jeeebot
"hello" = "Hello";
```

ko.lproj/strings.strings:
```
# Jeeebot
"hello" = "안녕하세요!";
```

```bash
$ jeeebot -t strings *.lproj/strings.strings --fieldPrefix kLang -o strings.h
```

will generates:

```h
//
//  strings.h
//
//  Created by Jeeebot on .
//  Copyright (c) 2015 . All rights reserved.
//
#ifndef strings_h


#pragma mark - Jeeebot

/** en : Hello! */
/** ko : 안녕하세요! */
static NSString* const kLangHello = @"hello";


#endif

```

## Keys for segue identifier
```bash
$ jeeebot -t segue Storyboard.storyboard --fieldPrefix kSegue -o SegueIdentifiers.h
```
```h
//
//  RPSegues.derived.h
//
//  Created by Jeeebot on Mon, Jan 26, 2015 12:44 PM.
//  Copyright (c) 2015 Jeeeyul Lee<jeeeyul@gmail.com>. All rights reserved.
//
#ifndef RPSegues_derived_h


#pragma mark - Root View Controller

/**
 A Constant for showDetail segue identifier ‘edit-sort’.
 Root View Controller -> Sort Controller (showDetail)
*/
static NSString* const kSegueEditSort = @"edit-sort";

/**
 A Constant for showDetail segue identifier ‘show’.
 Root View Controller -> Calendar Settings Editor (showDetail)
*/
static NSString* const kSegueShow = @"show";


#pragma mark - Calendar Settings Editor

/**
 A Constant for show segue identifier ‘edit-priority-filter’.
 Calendar Settings Editor -> Priority Filter Editor (show)
*/
static NSString* const kSegueEditPriorityFilter = @"edit-priority-filter";

/**
 A Constant for show segue identifier ‘edit-due-filter’.
 Calendar Settings Editor -> Due Date Filter Editor (show)
*/
static NSString* const kSegueEditDueFilter = @"edit-due-filter";


#endif
```

## Keys for Reuse Identifiers
```bash
$ jeeebot -t reuse Storyboard.storyboard --fieldPrefix kReuse -o ReuseIdentifiers.h
```
```h
//
//  RPReuses.derived.h
//
//  Created by Jeeebot on Mon, Jan 26, 2015 12:44 PM.
//  Copyright (c) 2015 Jeeeyul Lee<jeeeyul@gmail.com>. All rights reserved.
//
#ifndef RPReuses_derived_h


#pragma mark - Sort Controller

/** A constant for reuse identifier ‘default’ */
static NSString* const kReuseDefault = @"default";


#endif
```

## Keys for Image Assets
```bash
$ jeeebot -t asset Media.assets --fieldPrefix kImage -o NamedImages.h
```
```h
//
//  RPImages.derived.h
//
//  Created by Jeeebot on Mon, Jan 26, 2015 12:44 PM.
//  Copyright (c) 2015 Jeeeyul Lee<jeeeyul@gmail.com>. All rights reserved.
//
#ifndef RPImages_derived_h


#pragma mark - default

/** An image constants for AppIcon.appiconset */
static NSString* const kImageAppIcon = @"AppIcon";

/** An image constants for Logo.imageset */
static NSString* const kImageLogo = @"Logo";


#endif
```

## Keys for Core Data entities and attributes
```bash
$ jeeebot -t coredata "Test.xcdatamodeld/Test 4.xcdatamodel" --fieldPrefix kModel -o ModelKeys.h
```
```h
//
//  RPModelKeys.derived.h
//
//  Created by Jeeebot on Tue, Jan 27, 2015 9:58 AM.
//  Copyright (c) 2015 Jeeeyul Lee<jeeeyul@gmail.com>. All rights reserved.
//
#ifndef RPModelKeys_derived_h


#pragma mark - RPCalendarSettings

/** A constants for entity name ‘RPCalendarSettings’ */
static NSString* const kModelRPCalendarSettings = @"RPCalendarSettings";

/** calendarIdentifier:[String] attribute of RPCalendarSettings */
static NSString* const kModelRPCalendarSettingsCalendarIdentifier = @"calendarIdentifier";

/** displayInWidget:[Boolean] attribute of RPCalendarSettings */
static NSString* const kModelRPCalendarSettingsDisplayInWidget = @"displayInWidget";

/** displayNotScheduled:[Boolean] attribute of RPCalendarSettings */
static NSString* const kModelRPCalendarSettingsDisplayNotScheduled = @"displayNotScheduled";

/** dueDateFilter:[Integer 32] attribute of RPCalendarSettings */
static NSString* const kModelRPCalendarSettingsDueDateFilter = @"dueDateFilter";

/** filterCompoundRule:[Integer 32] attribute of RPCalendarSettings */
static NSString* const kModelRPCalendarSettingsFilterCompoundRule = @"filterCompoundRule";

/** order:[Integer 32] attribute of RPCalendarSettings */
static NSString* const kModelRPCalendarSettingsOrder = @"order";

/** priorityFilter:[Integer 32] attribute of RPCalendarSettings */
static NSString* const kModelRPCalendarSettingsPriorityFilter = @"priorityFilter";

/** useDueDateFilter:[Boolean] attribute of RPCalendarSettings */
static NSString* const kModelRPCalendarSettingsUseDueDateFilter = @"useDueDateFilter";

/** usePriorityFilter:[Boolean] attribute of RPCalendarSettings */
static NSString* const kModelRPCalendarSettingsUsePriorityFilter = @"usePriorityFilter";


#endif
```
