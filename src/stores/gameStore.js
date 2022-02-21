import { derived, readable, writable } from 'svelte/store';
import { browser } from '$app/env';

const words = [
    "KAISA",
    "INHIB",
    "LILLIA",
    "XAYAH",
    "JARVAN",
    "TARIC",
    "LETHAL",
    "AZIR",
    "DARKIN",
    "JUNGLE",
    "ELISE",
    "SHEEN",
    "DRAGON",
    "GRASP",
    "NEEKO",
    "BRAND",
    "GWEN",
    "PYKE",
    "XERATH",
    "MINION",
    "BASE",
    "KENCH",
    "GRAVES",
    "ESPORT",
    "SAMIRA",
    "EKKO",
    "NASUS",
    "TARGON",
    "GLASC",
    "WUKONG",
    "TALON",
    "VEIGAR",
    "ZERI",
    "ORNN",
    "LEONA",
    "JHIN",
    "WARD",
    "MUNDO",
    "BRAUM",
    "NOXUS",
    "DUO",
    "BANDLE",
    "KAYLE",
    "LUCIAN",
    "RAKAN",
    "KAYN",
    "QIYANA",
    "RAMMUS",
    "FIZZ",
    "SONA",
    "RANKED",
    "UDYR",
    "GRAGAS",
    "MID",
    "YASUO",
    "TURRET",
    "IGNITE",
    "RELL",
    "RENGAR",
    "SERAPH",
    "SORAKA",
    "REKSAI",
    "ANNIE",
    "TEMPO",
    "DIANA",
    "LEGEND",
    "YONE",
    "CHAMP",
    "LANE",
    "JINX",
    "POTION",
    "DARIUS",
    "JANNA",
    "PENTA",
    "FLASH",
    "OLAF",
    "SINGED",
    "RENATA",
    "ZAC",
    "JAYCE",
    "AKSHAN",
    "VIEGO",
    "VEX",
    "MAGIC",
    "KARMA",
    "BARON",
    "SPELL",
    "VI",
    "THRESH",
    "KOGMAW",
    "RIFT",
    "SHEN",
    "BOOTS",
    "AATROX",
    "BAN",
    "NAMI",
    "ULTI",
    "CORKI",
    "POPPY",
    "TEEMO",
    "SHACO",
    "BARD",
    "IXTAL",
    "ARCANE",
    "IVERN",
    "KLED",
    "IONIA",
    "DRAVEN",
    "ARDENT",
    "KENNEN",
    "RYLAI",
    "VARUS",
    "AMUMU",
    "AERY",
    "ASHE",
    "ZAUN ",
    "ZYRA",
    "SIVIR",
    "JAX",
    "RYZE",
    "AKALI",
    "IRELIA",
    "VIKTOR",
    "LUDEN",
    "VAYNE",
    "RUNAAN",
    "EZREAL",
    "LUX",
    "ATTACK",
    "ADC",
    "ZED",
    "ZILEAN",
    "SION",
    "ZOE",
    "TAHM",
    "NUNU",
    "TOP",
    "SWORD",
    "TIAMAT",
    "RIVEN",
    "HEAL",
    "SMITE",
    "RUMBLE",
    "ILLAOI",
    "QUINN",
    "GNAR",
    "YUUMI",
    "HERALD",
    "GHOST",
    "RIVER",
    "SYLAS",
    "ANIVIA",
    "ZHONYA",
    "FIORA",
    "SENNA",
    "URGOT",
    "TWITCH",
    "SYNDRA",
    "FLEET",
    "LULU",
    "WARMOG",
    "ZIGGS",
    "GALIO",
    "YORICK",
    "KHAZIX",
    "COMET",
    "DORAN",
    "MEJAI",
    "VOID",
    "SWAIN",
    "AHRI",
    "SOLARI",
    "YORDLE",
    "GAREN",
    "MAOKAI",
    "KDA",
    "VELKOZ",
    "SETT"
];

const today = new Date().getDay();
const randomWord = words[55];
const todaysWord = readable(randomWord);

const wordLength = derived(todaysWord, ($todaysWord) => $todaysWord.length);

const maxGuesses = derived(todaysWord, ($todaysWord) => $todaysWord.length);

const boardBuilder = () => {
	let tempRows = [];
	for (let i = 0; i < randomWord.length; i++) {
		const row = [];
		for (let j = 0; j < randomWord.length; j++) {
			row.push('');
		}
		tempRows.push(row);
	}
	return tempRows;
};


const rows = boardBuilder();
const savedGame = browser ? JSON.parse(window.localStorage.getItem('savedWordlolGameboard')) : undefined;



// game data
const currentArray = writable(savedGame ? savedGame.currentArray : 0);
const currentLetter = writable(savedGame ? savedGame.currentLetter : 0);
const gameRows = writable(savedGame ? savedGame.rows : rows);
const hasWon = writable(savedGame ? savedGame.hasWon : false)
const gameOver = writable(savedGame ? savedGame.gameOver : false)

// letter tracking
const correctLetters = writable(savedGame ? savedGame.correctLetters : []);
const wrongLetters = writable(savedGame ? savedGame.wrongLetters : []);
const inWordLetters = writable(savedGame ? savedGame.inWordLetters : []);

// letter position tracking
const correctLocations = writable(savedGame ? savedGame.correctLocations : []);
const wrongLocations = writable(savedGame ? savedGame.wrongLocations : []);
const inWordLocations = writable(savedGame ? savedGame.inWordLocations : []);

const statsObj = {
	totalWins: 0, 
	totalLosses: 0, 
}

const savedStats = browser ? window.localStorage.getItem('wordlolstats') : null;

const stats = savedStats ? writable(savedStats) : statsObj;

export {
	todaysWord,
	correctLetters,
	wrongLetters,
	correctLocations,
	wrongLocations,
	inWordLocations,
	inWordLetters,
	wordLength,
	maxGuesses,
	gameRows,
    currentArray,
    currentLetter,
	hasWon,
	gameOver
};
