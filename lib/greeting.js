

/**
 * handles displaying Burtbot to the user
 * @return {None}
 * @method drawBurtbot
 */
module.exports.drawBurtbot = function () {
	var burt;
	burt = [
		'           _____             ',
		'          |     |            ',
		'          | | | |            ',
		'          |_____|            ',
		'    ____ ___|_|___ ____      ',
		'   ()___)         ()___)     ',
		'   // /|           |\ \\\\     ',
		'  // / |           | \ \\\\    ',
		' (___) |___________| (___)   ',
		' (___)   (_______)   (___)   ',
		' (___)     (___)     (___)   ',
		' (___)      |_|      (___)   ',
		' (___)  ___/___\\___   | |    ',
		'  | |  |           |  | |    ',
		'  | |  |___________| /___\\   ',
		' /___\\  |||     ||| //   \\\\  ',
		'//   \\\\ |||     ||| \\\\   //  ',
		'\\\\   // |||     |||  \\\\ //   ',
		' \\\\ // ()__)   (__()         ',
		'       ///       \\\\\\         ',
		'      ///         \\\\\\        ',
		'    _///___     ___\\\\\\_      ',
		'   |_______|   |_______|     '
	];
	return burt.join( '\n' );
};

/**
 * handles letting humans know how to interact with Burtbot
 * @return {None}
 * @method showIntroduction
 */
module.exports.showIntroduction = function () {
		return 'Hello! I\'m Burtbot, but you can call me burt for short if you would like.\nI can run tasks for you, or if you prefer to not enter the same mundane commands again and again, you can teach me to run them for you.\nIf you would like to view my documention, head over to https://github.com/kkemple/burtbot.\nThere is tons of information for you.\nAlso, not only can you teach me to run tasks for you but my task memory can be expanded, making me even more helpful.';
};