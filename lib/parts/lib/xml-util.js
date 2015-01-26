var xpath = require('xpath');

exports.getComment = function(node){
	var commentNode = xpath.select1("preceding-sibling::node()[self::*|self::comment()][1][self::comment()]", node);
	var comment = commentNode ? commentNode.nodeValue : "N/A";
	return comment;
};
