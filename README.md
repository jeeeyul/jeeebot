# jeeebot
Xcode Constant Generator

[![Build Status](https://travis-ci.org/jeeeyul/jeeebot.svg)](https://travis-ci.org/jeeeyul/jeeebot)


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

## Keys for Core Data entities and attributes
```bash
$ jeeebot -t coredata "Test.xcdatamodeld/Test 4.xcdatamodel" --fieldPrefix kModel -o ModelKeys.h
```


