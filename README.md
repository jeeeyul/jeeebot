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
$ jeeebot -t strings *.lproj/strings.strings --fieldPrefix kLang
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
