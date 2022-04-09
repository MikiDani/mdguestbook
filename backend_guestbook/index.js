const cors = require('cors');
const express = require('express');
const app = express();
app.use(express.json());
app.use(cors());

const appPort = 8080;

let usersDatabase = [
    {
        id: 979900137,
        userDate: 1518825600,
        userTime: "09:45",
        userName: "Dániel",
        userEmail: "mail@mail.hu",
        userPassword: "123456"
    },
    {
        id: 558712109,
        userDate: 1518220800,
        userTime: "14:40",
        userName: "Petike",
        userEmail: "petike@mail.hu",
        userPassword: "654321"
    },
    {
        id: 972100357,
        userDate: 1616284800,
        userTime: "14:40",
        userName: "Zsuzsika",
        userEmail: "zsuzsi@mail.hu",
        userPassword: "abcdef"
    }
];

let bookDatabase = [ 
	{	
		id: 499376187,
		bookName: "Eaque blanditiis laudantium ut odio enim quidem iste facere!",
		bookDate: 1591833600,
		bookTime: "13:10",
        bookUserId: 979900137,
		messageDatabase: [
			{
				id: 429153825,
                messageDate: 1636156800,
                messageTime:"09:20",
				messageText: "A Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique aspernatur.",
				messageUserId: 558712109
			},
			{
				id: 331056866,
                messageDate: 1530057600,
                messageTime:"10:55",
				messageText: "B Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi magni quod et magnam officiis ratione.Perspiciat numquam!",
				messageUserId: 972100357
			},
			{
				id: 995385978,
                messageDate: 1542585600,
                messageTime:"08:55",
				messageText: "C Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi magni quod et magnam officiis ratione.Perspiciat numquam!",
				messageUserId: 979900137
			}
		]
	},
	{	
		id: 815532979,
		bookName: "Asperiores nisi neque ducimus quam veritatis cum quasi necessitqweqweatibus iste animi.",
		bookDate: 1537747200,
		bookTime: "16:15",
        bookUserId: 972100357,
		messageDatabase: [
			{
				id: 426678450,
                messageDate: 1526428800,
                messageTime:"09:30",
				messageText: "11 Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni exercitationem vel eveniet deleniti quasi voluptatibus.Perspiciatis aliquam et, minus cumque accusantium quam totam corporis nam assumenda unde ex dolore quibusdam libero quis aliquid dignissimos blanditiis laborum autem laboriosam, iste dolor? Distinctio reiciendis amet magni numquam!",
				messageUserId: 979900137
			},
			{
				id: 926906623,
                messageDate: 1601251200,
                messageTime:"10:10",
				messageText: "22 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime perferendis provident, voluptatibus repellat nemo tempora.Lorem.",
				messageUserId: 558712109
			},
			{
				id: 236416937,
                messageDate: 1579996800,
                messageTime:"10:10",
				messageText: "33 Quos distinctio mollitia minus molestiae voluptate deleniti, qui sed sapiente maxime quae perspiciatis et doloremque ex laboriosam. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime perferendis provident, voluptatibus repellat nemo tempora.Lorem. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime perferendis provident, voluptatibus repellat nemo tempora.Lorem.Perspiciatis aliquam et, minus cumque accusantium quam totam corporis nam assumenda unde ex dolore quibusdam libero quis aliquid dignissimos blanditiis laborum autem laboriosam, iste dolor? Distinctio reiciendis amet magni numquam!",
				messageUserId: 972100357
			}
		]
	},
    {	
		id: 671415357,
		bookName: "1879 History asperiores nisi neque ducimus quam veritatis cum quasi necessitqweqweatibus iste animi. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime perferendis provident, voluptatibus repellat nemo tempora.Lorem. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime perferendis provident, voluptatibus repellat nemo tempora.Lorem.",
		bookDate: 1549152000,
		bookTime: "16:15",
        bookUserId: 558712109,
		messageDatabase: [
			{
				id: 718391075,
                messageDate: 1532563200,
                messageTime:"09:30",
				messageText: "Qurem ipsum dolor sit amet consectetur adipisicing elit. Magni exercitationem vel eveniet deleniti quasi voluptatibus.Perspiciatis aliquam et, minus cumque accusantium quam totam corporis nam assumenda unde ex dolore quibusdam libero quis aliquid dignissimos blanditiis laborum autem laboriosam, iste dolor? Distinctio reiciendis amet magni numquam!",
				messageUserId: 979900137
			},
			{
				id: 482204127,
                messageDate: 1605225600,
                messageTime:"10:10",
				messageText: "1879. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime perferendis provident, voluptatibus repellat nemo tempora.Lorem.Perspiciatis aliquam et, minus cumque accusantium quam totam corporis nam assumenda unde ex dolore quibusdam libero quis aliquid dignissimos blanditiis laborum autem laboriosam, iste dolor? Distinctio reiciendis amet magni numquam!Perspiciatis aliquam et, minus cumque accusantium quam totam corporis nam assumenda unde ex dolore quibusdam libero quis aliquid dignissimos blanditiis laborum autem laboriosam, iste dolor? Distinctio reiciendis amet magni numquam!",
				messageUserId: 558712109
			},
			{
				id: 306447149,
                messageDate: 1552780800,
                messageTime:"10:10",
				messageText: "Arem ipsum dolor, sit amet consectetur adipisicing elit. Maxime perferendis provident, voluptatibus repellat nemo tempora.Lorem. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime perferendis provident, voluptatibus repellat nemo tempora.Lorem.",
				messageUserId: 972100357
			}
		]
	}
];

app.get('/api/port', (req, res) => {
    res.send(`The app is running on this port: ${appPort}!`);
});

app.get('/api/userslist', (req, res) => {
    res.status(200).send(usersDatabase);
});

app.get('/api/user/booklist/:id', (req, res) => {
    const userId=parseInt(req.params.id);
    let findTheme=[];
    for (let theme of bookDatabase) {
        if (theme.bookUserId==userId) {
            findTheme.push(theme);
        }
    }
    res.status(200).send(findTheme);
});

app.get('/api/activeuserslist', (req, res) => {
    let usersActive=[];
	for (let list of usersDatabase) {
        if (list.userEmail) {
            usersActive.push(list);
        }
	}
    res.status(200).send(usersActive);
});

app.post('/api/userslist/add', (req, res) => {
    const newId = generateId();
    const newDate = DateReader();
    const newTime = TimeReader();

    const newUser = {
        ...req.body,
        id: newId,
        userDate: newDate,
        userTime: newTime,
        userMessages: [] 
    };

    usersDatabase.push(newUser);
    res.status(200).send('The User insert was successfully!');
});

app.put('/api/userslist/deleteuser', (req, res) => {
    if (req.body) {  
        // inactive the user. Id and userName remain.
        const upId=parseInt(req.body.userId);
        const loadTheme = usersDatabase.find((user) => user.id === parseInt(upId));
        
        const newUserMod = {
            "id": upId,
            "userName": loadTheme.userName
        }

        const index = usersDatabase.indexOf(loadTheme);
        usersDatabase[index] = newUserMod;
        res.status(200).send('The user is deleted the database!');
    } else {
        res.status(400).send('Request Body error!');
    }
});

app.put('/api/userslist/usermodification/', (req, res) => {
    if (req.body) {
        const upId=parseInt(req.body.id);
        const loadTheme = usersDatabase.find((user) => user.id === parseInt(upId));
        const newUserMod = {
            ...loadTheme,
            ...req.body
        }
        const index = usersDatabase.indexOf(loadTheme);
        usersDatabase[index] = newUserMod;
        res.status(200).send('The user is modifed!');
    } else {
        res.status(400).send('Request Body error!');
    }
});

/* ALL THEME LIST */
app.get('/api/bookslist', (req, res) => {
    const searchWord = Object.values(req.query);
    let sortingBookDatabase=null;
    if (searchWord) { sortingBookDatabase=sortingDate(searchWord); }
    if ( sortingBookDatabase==null ) { sortingBookDatabase=bookDatabase; }
    if (sortingBookDatabase) {
        res.status(200).send(sortingBookDatabase);
    } else {
        res.status(400).send('Error load sorting Database!');
    }
});

/* SELECTED THEME */
app.get('/api/theme/:id', (req, res) => {
    const searchWord = Object.values(req.query);

    let sortingMessageDatabase=null;
    const dataTheme = bookDatabase.find((book) => book.id === parseInt(req.params.id));
        
    const dataMessage = dataTheme.messageDatabase;
    if (searchWord) { 
        if (searchWord.toString()==='desc') {
            sortingMessage = dataMessage.sort((first, second) => first.messageText < second.messageText ? 1 : -1);
        } else if (searchWord.toString()==='asc') {
            sortingMessage = dataMessage.sort((first, second) => first.messageText < second.messageText ? -1 : 1);
        } else if (searchWord.toString()==='date') {
            sortingMessage = dataMessage.sort((first, second) => first.messageDate < second.messageDate ? 1 : -1);
        } else if (searchWord.toString()==='dateinversely') {
            sortingMessage = dataMessage.sort((first, second) => first.messageDate < second.messageDate ? -1 : 1);
        }
    }
    if ( sortingMessageDatabase==null ) { sortingMessageDatabase=dataTheme; }
    if (dataTheme) {
        res.status(200).send(sortingMessageDatabase);
    } else {
        res.status(404).send('No have theme in this id!');
    }
});

app.post('/api/bookslist/add', (req,res) => {
    if (req.body) {
        const newId = generateId();
        const newIdmessage = generateId();
        const newDate = DateReader();
        const newTime = TimeReader();
        
        const newTheme = {
            ...req.body,
            id: newId,
            bookDate: newDate,
            bookTime: newTime,
            messageDatabase: [
                {
                id: newIdmessage,
                messageDate: newDate,
                messageTime: newTime,
                messageText: req.body.messageDatabase[0].messageText,
                messageUserId: req.body.messageDatabase[0].messageUserId
                }
            ]
        }

        bookDatabase.push(newTheme);
        res.status(200).send('The theme insert the database!');
        } else {
        res.status(400).send('Request Body error!');
    }
});

app.delete('/api/bookslist/delete', (req, res) => {
    if (req.body) {  
        const idIn = req.body.themeId;
        let delId;
        let count=0;
        for (let bookList of bookDatabase) {
            if (bookList.id === idIn) { delId=count; }
            count++;
        }
        bookDatabase.splice(delId, 1);
        res.status(200).send('The theme deleted the database!');
    } else {
        res.status(400).send('Request Body error!');
    }
});

app.put('/api/bookslist/addmessage', (req, res) => {
    if (req.body) {
        const upId=parseInt(req.body.newMessageSend.themeId);
        const upMessage=req.body.newMessageSend.messageText;
        const upUser=req.body.newMessageSend.messageUserId;
        const upDate=DateReader();
        const upTime=TimeReader();
        const upNewId=generateId();
        const loadTheme = bookDatabase.find((theme) => theme.id === parseInt(upId));
        
        const newMessage = {
            ...loadTheme,
            "messageDatabase": [      
                ...loadTheme.messageDatabase,
                {
                "id": upNewId,
                "messageDate": upDate,
                "messageTime": upTime,
                "messageText": upMessage,
                "messageUserId": upUser
                }
            ],
        }

        const index = bookDatabase.indexOf(loadTheme);
        bookDatabase[index] = newMessage;
        res.status(200).send('The message insert the database!');
    } else {
        res.status(400).send('Request Body error!');
    }
});

app.put('/api/bookslist/deletemessage', (req, res) => {
    if (req.body) {
        const messageId=req.body.messageId;
        const themeId=req.body.themeId;
        const loadTheme = bookDatabase.find((theme) => theme.id === parseInt(themeId));
        const allMessages = loadTheme.messageDatabase;
        goodMessages=[];
        allMessages.map((message) => {
            message.id !== messageId && goodMessages.push(message);
        });

        const newMessage = {
            ...loadTheme,
            "messageDatabase": [      
                ...goodMessages,
            ],
        }

        newBook=[];
        bookDatabase.map((list) => {
            if (list.id===themeId) {
                newBook.push(newMessage);
            } else {
                newBook.push(list);
            }
        });
        bookDatabase=newBook; // felülírás
        res.status(200).send('The message insert the database!');
    } else {
        res.status(400).send('Request Body error!');
    }
});

/****** Listen ******/
app.listen(appPort, () => console.log('MD guestbook backend app is listening on '+ appPort +'-port!'));

/* functions */
function sortingDate(searchWord) {
    let sortingBookDatabase=null;
    if (searchWord.toString()==='desc') {
        sortingBookDatabase = bookDatabase.sort((first, second) => first.bookName < second.bookName ? 1 : -1);
    } else if (searchWord.toString()==='asc') {
        sortingBookDatabase = bookDatabase.sort((first, second) => first.bookName < second.bookName ? -1 : 1);
    } else if (searchWord.toString()==='date') {
        sortingBookDatabase = bookDatabase.sort((first, second) => first.bookDate < second.bookDate ? 1 : -1);
    } else if (searchWord.toString()==='dateinversely') {
        sortingBookDatabase = bookDatabase.sort((first, second) => first.bookDate < second.bookDate ? -1 : 1);
    }
return sortingBookDatabase;
}

function TimeReader () {
    var today = new Date();
    var nullaH; var nullaM; var nullaS;
    
    (today.getHours()+1)<10 ? nullaH="0" : nullaH="";
    (today.getMinutes()+1)<10 ? nullaM="0" : nullaM="";
    
    var time = ""+nullaH+today.getHours()+":"+nullaM+today.getMinutes()+"";
    return time;
}

function DateReader () {
    var today = new Date();
    var myEpoch = today.getTime()/1000.0;
    return myEpoch;
}

function randomDateGenerator () {
    let repeat=true;
    let random;
    do {
        random=Math.floor(Math.random()*22);
        if (random>17) { repeat=false; }    /* min. 2018 */
    } while (repeat);
    let randomYear='20'+random;
    let randomMonath=random=Math.floor(Math.random()*12)+1;
    let randomDay=random=Math.floor(Math.random()*28)+1;
    if (randomMonath<10) { randomMonath='0'+randomMonath; }
    if (randomDay<10) { randomDay='0'+randomDay; }
    let generateDate=(randomYear+'-'+randomMonath+'-'+randomDay);
    var myDate = new Date(generateDate);
    var myEpoch = myDate.getTime()/1000.0;
    return myEpoch;
}

function generateId() {
    let repeat=false;
    let generatedId;
    do {
        generatedId = Math.floor(Math.random() * 1000000000);
        for (usersIdList of usersDatabase) {
            if (generatedId === usersIdList.id) {
                repeat=true;
            }
        }
        for (bookIdList of bookDatabase) {
            if (generatedId === bookIdList.id) {
                repeat=true;
            }
            for (messageDatabaseList of bookIdList.messageDatabase) {
                if (generatedId === messageDatabaseList.id) {
                    repeat=true;
                }
            }
        } 
    } while (repeat);
    return generatedId;
}