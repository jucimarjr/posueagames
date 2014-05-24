BasicGame.Missions = function () {
	this.stats = [];

	this._periods = [
		{ type: BasicGame.Missions.Period.Single, name: 'single' },
		{ type: BasicGame.Missions.Period.CasualDate, name: 'casual date' },
		{ type: BasicGame.Missions.Period.FixedDate, name: 'fixed date' },
		{ type: BasicGame.Missions.Period.SeriousRelationship, name: 'serious relationship' },
		{ type: BasicGame.Missions.Period.Engaged, name: 'engaged' },
		{ type: BasicGame.Missions.Period.Married, name: 'married' },
		{ type: BasicGame.Missions.Period.RenewedVows, name: 'renewed vows' },
		{ type: BasicGame.Missions.Period.OldAge, name: 'old age' }
	];

	this._events = this.getNewEvents();
	this._constEvents = new Array();

	for (var i = 0; i < this._events.length; i++) {
		this._constEvents.push(this._events[i]);
	};

	this._restartArray = false;
	this._maxIndexReturned = 0;
	this._lastIndex = -1;
	// this._count = 0;
	this._periodIndex = 0;

};

BasicGame.Missions.Period = {
	Single: 0,
	CasualDate: 1,
	SeriousRelationship: 2,
	Engaged: 3,
	Married: 4,
	RenewedVows: 5,
	OldAge: 6
};

BasicGame.Missions.Event = {
	Sight: 0, // start at 'single'
	Talk: 1,
	AskForDate: 2, // unique, change to 'casual date'
	RegularDate: 3,
	NiceDate: 4,
	AskForKiss: 5, // unique, change to 'fixed date'
	Kiss: 6,
	Argument: 7,
	ChangedFacebookStatus: 8, // unique, change to 'serious relationship'
	Fight: 9,
	Sex: 10,
	Proposed: 11, // unique, change to 'engaged'
	Vacation: 12,
	DineWithFamily: 13,
	CantGetItUp: 14,
	WeddingCeremony: 15, // unique, change to 'married'
	Cheat: 16,
	Child: 17,
	RenewVows: 18, // unique, change to 'renewed vows'
	NoSex: 19,
	GotOld: 20, // unique, change to 'old age'
	GrandChild: 21,
	HealthProblem: 22,
	Death: 23
};

BasicGame.Missions.prototype = {

	getNewEvents: function () {
		return [
			{ type: BasicGame.Missions.Event.Sight, name: 'sight' },
			{ type: BasicGame.Missions.Event.Talk, name: 'talk' },
			{ type: BasicGame.Missions.Event.AskForDate, name: 'ask 4\ndate', isUnique: true },
			{ type: BasicGame.Missions.Event.RegularDate, name: 'regular\ndate' },
			{ type: BasicGame.Missions.Event.NiceDate, name: 'nice\ndate' },
			{ type: BasicGame.Missions.Event.AskForKiss, name: 'ask 4\nkiss', isUnique: true },
			{ type: BasicGame.Missions.Event.Kiss, name: 'kiss' },
			{ type: BasicGame.Missions.Event.Argument, name: 'argument' },
			{ type: BasicGame.Missions.Event.ChangedFacebookStatus, name: 'changeed\nFB status', isUnique: true },
			{ type: BasicGame.Missions.Event.Fight, name: 'fight' },
			{ type: BasicGame.Missions.Event.Sex, name: 'sex' },
			{ type: BasicGame.Missions.Event.Proposed, name: 'proposal', isUnique: true },
			{ type: BasicGame.Missions.Event.Vacation, name: 'vacation' },
			{ type: BasicGame.Missions.Event.DineWithFamily, name: 'family\ndinner' },
			{ type: BasicGame.Missions.Event.CantGetItUp, name: 'limp\nsex' },
			{ type: BasicGame.Missions.Event.WeddingCeremony, name: 'wedding', isUnique: true },
			{ type: BasicGame.Missions.Event.Cheat, name: 'cheating' },
			{ type: BasicGame.Missions.Event.Child, name: 'child' },
			{ type: BasicGame.Missions.Event.RenewVows, name: 'renew\nvows', isUnique: true },
			{ type: BasicGame.Missions.Event.NoSex, name: '0 sex\nmonth' },
			{ type: BasicGame.Missions.Event.GotOld, name: 'time\npasses...', isUnique: true },
			{ type: BasicGame.Missions.Event.GrandChild, name: 'grandchild' },
			{ type: BasicGame.Missions.Event.HealthProblem, name: 'disease' },
			{ type: BasicGame.Missions.Event.Death, name: 'your time\nhas come', isGameOver: true }
		];
	},

	nextEventIndex: function () {

		var events = this._events;
		var restartArray = this._restartArray;
		var maxIndexReturned = this._maxIndexReturned;
		var lastIndex = this._lastIndex;
		var retEvent;
		// var printBar = false;
		// var printReord = false;

		if (lastIndex >= 0 && !restartArray) {
			lastIndex = Math.min(lastIndex, events.length - 1);
			retEvent = events[lastIndex];

			if (lastIndex > maxIndexReturned) {
				restartArray = true;
				maxIndexReturned = lastIndex;
				// printBar = true;
			}

			lastIndex++;

		} else if (lastIndex >= 0 && restartArray) {
			lastIndex = 1;
			retEvent = events[0];
			restartArray = false;
		} else {
			retEvent = events[++lastIndex];
			// printBar = true;
		}

		if (retEvent.isUnique) {
			maxIndexReturned = 0;
			lastIndex = -1;

			this.removeObjectFromArray(events, retEvent);
			this.removeObjectFromArray(events, events[0]);

			this._periodIndex++;
			
			// printReord = true;
		}

		this._restartArray = restartArray;
		this._lastIndex = lastIndex;
		this._maxIndexReturned = maxIndexReturned;

		// console.log(retEvent.name + ' count: ' + ++this._count);

		// if (printBar)
		// 	console.log('-----------------------');

		// if (printReord)
		// 	console.log('-------reorder---------');

		return retEvent;
	},

	removeObjectFromArray: function (array, object) {
		var index = array.indexOf(object);
		
		if (index !== -1) {
			var removedObjects = array.splice(index, 1);
			removedObjects[0] = null;
			console.log('removing entry: ' + object.name);
		}
	},

	currentPeriod: function () {
		return this._periods[this._periodIndex];
	},

	computeEvent: function (event) {
		var index = this._constEvents.indexOf(event);

		if (!this.stats[index])
			this.stats[index] = 1;
		else
			this.stats[index] += 1;
	},

	printStats: function () {
		for (var key in this.stats) {
			var name = this.replaceNewLines(this._constEvents[key].name);
			console.log(name + ": " + this.stats[key]);
		};
	},

	replaceNewLines: function (str)	{
		return str.replace(/\n/g," ");
	}
};
