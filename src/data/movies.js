// Marvel and related movie franchises data
const movies = [
  {
    id: 1,
    title: "X-Men",
    releaseDate: "July 14, 2000",
    franchise: "X-Men",
  },
  {
    id: 2,
    title: "Spider-Man",
    releaseDate: "May 3, 2002",
    franchise: "Spider-Man (Sony)",
  },
  {
    id: 3,
    title: "X2: X-Men United",
    releaseDate: "May 2, 2003",
    franchise: "X-Men",
  },
  {
    id: 4,
    title: "Spider-Man 2",
    releaseDate: "June 30, 2004",
    franchise: "Spider-Man (Sony)",
  },
  {
    id: 5,
    title: "Fantastic Four",
    releaseDate: "July 8, 2005",
    franchise: "Fantastic Four (Fox)",
  },
  {
    id: 6,
    title: "X-Men: The Last Stand",
    releaseDate: "May 26, 2006",
    franchise: "X-Men",
  },
  {
    id: 7,
    title: "Spider-Man 3",
    releaseDate: "May 4, 2007",
    franchise: "Spider-Man (Sony)",
  },
  {
    id: 8,
    title: "Fantastic Four: Rise of the Silver Surfer",
    releaseDate: "June 15, 2007",
    franchise: "Fantastic Four (Fox)",
  },
  {
    id: 9,
    title: "Iron Man",
    releaseDate: "May 2, 2008",
    franchise: "Marvel Cinematic Universe",
  },
  {
    id: 10,
    title: "The Incredible Hulk",
    releaseDate: "June 13, 2008",
    franchise: "Marvel Cinematic Universe",
  },
  {
    id: 11,
    title: "X-Men Origins: Wolverine",
    releaseDate: "May 1, 2009",
    franchise: "X-Men",
  },
  {
    id: 12,
    title: "Iron Man 2",
    releaseDate: "May 7, 2010",
    franchise: "Marvel Cinematic Universe",
  },
  {
    id: 13,
    title: "Thor",
    releaseDate: "May 6, 2011",
    franchise: "Marvel Cinematic Universe",
  },
  {
    id: 14,
    title: "X-Men: First Class",
    releaseDate: "June 3, 2011",
    franchise: "X-Men",
  },
  {
    id: 15,
    title: "Captain America: The First Avenger",
    releaseDate: "July 22, 2011",
    franchise: "Marvel Cinematic Universe",
  },
  {
    id: 16,
    title: "The Avengers",
    releaseDate: "May 4, 2012",
    franchise: "Marvel Cinematic Universe",
  },
  {
    id: 17,
    title: "The Amazing Spider-Man",
    releaseDate: "July 3, 2012",
    franchise: "Spider-Man (Sony)",
  },
  {
    id: 18,
    title: "Iron Man 3",
    releaseDate: "May 3, 2013",
    franchise: "Marvel Cinematic Universe",
  },
  {
    id: 19,
    title: "The Wolverine",
    releaseDate: "July 26, 2013",
    franchise: "X-Men",
  },
  {
    id: 20,
    title: "Thor: The Dark World",
    releaseDate: "November 8, 2013",
    franchise: "Marvel Cinematic Universe",
  },
  {
    id: 21,
    title: "Captain America: The Winter Soldier",
    releaseDate: "April 4, 2014",
    franchise: "Marvel Cinematic Universe",
  },
  {
    id: 22,
    title: "The Amazing Spider-Man 2",
    releaseDate: "May 2, 2014",
    franchise: "Spider-Man (Sony)",
  },
  {
    id: 23,
    title: "X-Men: Days of Future Past",
    releaseDate: "May 23, 2014",
    franchise: "X-Men",
  },
  {
    id: 24,
    title: "Guardians of the Galaxy",
    releaseDate: "August 1, 2014",
    franchise: "Marvel Cinematic Universe",
  },
  {
    id: 25,
    title: "Avengers: Age of Ultron",
    releaseDate: "May 1, 2015",
    franchise: "Marvel Cinematic Universe",
  },
  {
    id: 26,
    title: "Ant-Man",
    releaseDate: "July 17, 2015",
    franchise: "Marvel Cinematic Universe",
  },
  {
    id: 27,
    title: "Deadpool",
    releaseDate: "February 12, 2016",
    franchise: "X-Men",
  },
  {
    id: 28,
    title: "Captain America: Civil War",
    releaseDate: "May 6, 2016",
    franchise: "Marvel Cinematic Universe",
  },
  {
    id: 29,
    title: "X-Men: Apocalypse",
    releaseDate: "May 27, 2016",
    franchise: "X-Men",
  },
  {
    id: 30,
    title: "Doctor Strange",
    releaseDate: "November 4, 2016",
    franchise: "Marvel Cinematic Universe",
  },
  {
    id: 31,
    title: "Logan",
    releaseDate: "March 3, 2017",
    franchise: "X-Men",
  },
  {
    id: 32,
    title: "Guardians of the Galaxy Vol. 2",
    releaseDate: "May 5, 2017",
    franchise: "Marvel Cinematic Universe",
  },
  {
    id: 33,
    title: "Spider-Man: Homecoming",
    releaseDate: "July 7, 2017",
    franchise: "Marvel Cinematic Universe",
  },
  {
    id: 34,
    title: "Thor: Ragnarok",
    releaseDate: "November 3, 2017",
    franchise: "Marvel Cinematic Universe",
  },
  {
    id: 35,
    title: "Deadpool 2",
    releaseDate: "May 18, 2018",
    franchise: "X-Men",
  },
  {
    id: 36,
    title: "Black Panther",
    releaseDate: "February 16, 2018",
    franchise: "Marvel Cinematic Universe",
  },
  {
    id: 37,
    title: "Avengers: Infinity War",
    releaseDate: "April 27, 2018",
    franchise: "Marvel Cinematic Universe",
  },
  {
    id: 38,
    title: "Ant-Man and the Wasp",
    releaseDate: "July 6, 2018",
    franchise: "Marvel Cinematic Universe",
  },
  {
    id: 39,
    title: "Venom",
    releaseDate: "October 5, 2018",
    franchise: "Sony's Universe",
  },
  {
    id: 40,
    title: "Spider-Man: Into the Spider-Verse",
    releaseDate: "December 14, 2018",
    franchise: "Spider-Verse Saga",
  },
  {
    id: 41,
    title: "Captain Marvel",
    releaseDate: "March 8, 2019",
    franchise: "Marvel Cinematic Universe",
  },
  {
    id: 42,
    title: "Avengers: Endgame",
    releaseDate: "April 26, 2019",
    franchise: "Marvel Cinematic Universe",
  },
  {
    id: 43,
    title: "X-Men: Dark Phoenix",
    releaseDate: "June 7, 2019",
    franchise: "X-Men",
  },
  {
    id: 44,
    title: "Spider-Man: Far From Home",
    releaseDate: "July 2, 2019",
    franchise: "Marvel Cinematic Universe",
  },
  {
    id: 45,
    title: "The New Mutants",
    releaseDate: "August 28, 2020",
    franchise: "X-Men",
  },
  {
    id: 46,
    title: "Black Widow",
    releaseDate: "July 9, 2021",
    franchise: "Marvel Cinematic Universe",
  },
  {
    id: 47,
    title: "Venom: Let There Be Carnage",
    releaseDate: "October 1, 2021",
    franchise: "Sony's Universe",
  },
  {
    id: 48,
    title: "Shang-Chi and the Legend of the Ten Rings",
    releaseDate: "September 3, 2021",
    franchise: "Marvel Cinematic Universe",
  },
  {
    id: 49,
    title: "Eternals",
    releaseDate: "November 5, 2021",
    franchise: "Marvel Cinematic Universe",
  },
  {
    id: 50,
    title: "Spider-Man: No Way Home",
    releaseDate: "December 17, 2021",
    franchise: "Marvel Cinematic Universe",
  },
  {
    id: 51,
    title: "Morbius",
    releaseDate: "April 1, 2022",
    franchise: "Sony's Universe",
  },
  {
    id: 52,
    title: "Doctor Strange in the Multiverse of Madness",
    releaseDate: "May 6, 2022",
    franchise: "Marvel Cinematic Universe",
  },
  {
    id: 53,
    title: "Thor: Love and Thunder",
    releaseDate: "July 8, 2022",
    franchise: "Marvel Cinematic Universe",
  },
  {
    id: 54,
    title: "Black Panther: Wakanda Forever",
    releaseDate: "November 11, 2022",
    franchise: "Marvel Cinematic Universe",
  },
  {
    id: 55,
    title: "Ant-Man and the Wasp: Quantumania",
    releaseDate: "February 17, 2023",
    franchise: "Marvel Cinematic Universe",
  },
  {
    id: 56,
    title: "Guardians of the Galaxy Vol. 3",
    releaseDate: "May 5, 2023",
    franchise: "Marvel Cinematic Universe",
  },
  {
    id: 57,
    title: "Spider-Man: Across the Spider-Verse",
    releaseDate: "June 2, 2023",
    franchise: "Spider-Verse Saga",
  },
  {
    id: 58,
    title: "The Marvels",
    releaseDate: "November 10, 2023",
    franchise: "Marvel Cinematic Universe",
  },
  {
    id: 59,
    title: "Madame Web",
    releaseDate: "February 14, 2024",
    franchise: "Sony's Universe",
  },
  {
    id: 60,
    title: "Deadpool & Wolverine",
    releaseDate: "July 26, 2024",
    franchise: "Marvel Cinematic Universe",
  },
  {
    id: 61,
    title: "Venom: The Last Dance",
    releaseDate: "October 25, 2024",
    franchise: "Sony's Universe",
  },
  {
    id: 62,
    title: "Kraven the Hunter",
    releaseDate: "December 13, 2024",
    franchise: "Sony's Universe",
  },
  {
    id: 63,
    title: "Captain America: Brave New World",
    releaseDate: "February 14, 2025",
    franchise: "Marvel Cinematic Universe",
  },
  {
    id: 64,
    title: "Thunderbolts",
    releaseDate: "May 2, 2025",
    franchise: "Marvel Cinematic Universe",
  },
  {
    id: 65,
    title: "The Fantastic Four: First Steps",
    releaseDate: "July 25, 2025",
    franchise: "Marvel Cinematic Universe",
  },
  {
    id: 66,
    title: "Spider-Man: Beyond the Spider-Verse",
    releaseDate: "June 4, 2027",
    franchise: "Spider-Verse Saga",
  },
  {
    id: 67,
    title: "Avengers: Doomsday",
    releaseDate: "May 1, 2026",
    franchise: "Marvel Cinematic Universe",
  },
  {
    id: 68,
    title: "Spider-Man: Brand New Day",
    releaseDate: "July 31, 2026",
    franchise: "Marvel Cinematic Universe",
  },
  {
    id: 69,
    title: "Avengers: Secret Wars",
    releaseDate: "May 7, 2027",
    franchise: "Marvel Cinematic Universe",
  },
];

export default movies;
