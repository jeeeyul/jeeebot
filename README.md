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
$ jeeebot -t strings Storyboard.storyboard --fieldPrefix kSegue -o SegueIdentifiers.h
```
