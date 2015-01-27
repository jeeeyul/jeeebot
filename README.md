# jeeebot
Xcode Constant Generator

[![Build Status](https://travis-ci.org/jeeeyul/jeeebot.svg)](https://travis-ci.org/jeeeyul/jeeebot)


## .strings
```strings
# Jeeebot
"hello" = "world";
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

/** world */
static NSString* const kHello = @"hello";


#endif
```
