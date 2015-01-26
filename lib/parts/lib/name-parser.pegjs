words =
f:word l:(WS? e:word {return e})* WS?
{return [f].concat(l);}
;

word =
cappedWord / plainWord;

cappedWord =
UPPERCASE+ LOWERCASE*
{return text()}
;

plainWord =
LOWERCASE+
{return text()}
;


UPPERCASE = [A-Z];
LOWERCASE = [a-z0-9];
WS        = [\t_ ]+;
