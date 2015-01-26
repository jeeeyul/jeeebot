start =
ws*
first:entry others:(ws* each:entry{return each;})*
ws*
{
	var result = [first];
	if(others){
		result = result.concat(others);
	}
	return result
}

entry =
languageKey / comment

languageKey =
key : StringLiteral ws* '=' ws* value:StringLiteral ws* ';'
{
	return {
		"type" : "languageKey",
		"key" : key.value,
		"value" : value.value
	};
}

comment =
	multilineComment / lineComment;

multilineComment =
'/*' ws*
text:(MC_PART* {return text()})
'*/'
{
	return {
		"type" : "comment",
		"multiline" : true,
		"text" : text.replace(/[\r\n][\s\t]*[\*]*/g, " ")
			.trim()
			.replace(/[\s]+/g, " ")
	};
}

lineComment =
('/''/'+ / '#'+) ws* text:([^\n^\r])*
{
	return {
		"type" : "comment",
		"multiline" : false,
		"text" : text.join("").trim().replace(/[\s]+/g, " ")
	};
}

StringLiteral "string"
= '"' chars:DoubleStringCharacter* '"' {
	return { type: "Literal", value: chars.join("") };
}
/ "'" chars:SingleStringCharacter* "'" {
	return { type: "Literal", value: chars.join("") };
}

DoubleStringCharacter
= !('"' / "\\" / LineTerminator) SourceCharacter { return text(); }
/ "\\" sequence:EscapeSequence { return sequence; }
/ LineContinuation

SingleStringCharacter
= !("'" / "\\" / LineTerminator) SourceCharacter { return text(); }
/ "\\" sequence:EscapeSequence { return sequence; }
/ LineContinuation

LineContinuation
= "\\" LineTerminatorSequence { return ""; }

EscapeSequence
= CharacterEscapeSequence
/ "0" !DecimalDigit { return "\0"; }
/ HexEscapeSequence
/ UnicodeEscapeSequence

CharacterEscapeSequence
= SingleEscapeCharacter
/ NonEscapeCharacter

SingleEscapeCharacter
= "'"
/ '"'
/ "\\"
/ "b"  { return "\b";   }
/ "f"  { return "\f";   }
/ "n"  { return "\n";   }
/ "r"  { return "\r";   }
/ "t"  { return "\t";   }
/ "v"  { return "\x0B"; }   // IE does not recognize "\v".

NonEscapeCharacter
= !(EscapeCharacter / LineTerminator) SourceCharacter { return text(); }

EscapeCharacter
= SingleEscapeCharacter
/ DecimalDigit
/ "x"
/ "u"

HexEscapeSequence
= "x" digits:$(HexDigit HexDigit) {
	return String.fromCharCode(parseInt(digits, 16));
}

UnicodeEscapeSequence
= "u" digits:$(HexDigit HexDigit HexDigit HexDigit) {
	return String.fromCharCode(parseInt(digits, 16));
}

LineTerminator
= [\n\r\u2028\u2029]

ws "whitespace"
= "\t"
/ "\v"
/ "\f"
/ " "
/ "\u00A0"
/ "\uFEFF"
/ Zs
/ LineTerminatorSequence

SourceCharacter
= .

LineTerminatorSequence "end of line"
= "\n"
/ "\r\n"
/ "\r"
/ "\u2028"
/ "\u2029"

MC_PART =
[^*]
/ '*'[^/];

DecimalDigit
= [0-9]

HexDigit
= [0-9a-f]i

// Separator, Space
Zs = [\u0020\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]
