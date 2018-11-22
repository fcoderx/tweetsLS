const listaTweets = document.getElementById('lista-tweets'); 



//EVENTOS

eventListeners();

function eventListeners() {
     //Cunado se envia al formulario
    document.querySelector('#formulario').addEventListener('submit', agregarTweet); 

    //Borrar tweets
    listaTweets.addEventListener('click', borrarTweet);

    //Contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);
}







//***********************FUNCIONES**************************** 

function agregarTweet(e){
    e.preventDefault();
    //Leer el valor del textarea
    const tweet = document.getElementById('tweet').value;//Con .value accedo al valor del textarea 

    //Crear botón de elimimar
    const botonEliminar = document.createElement('a');
    botonEliminar.classList = 'borrar-tweet';
    botonEliminar.innerText = 'X';

    //Crear elemento y añadirle el contenido a la lista
    const li = document.createElement('li');
    li.innerText = tweet;
    //Añade el botón de eliminar al tweet
    li.appendChild(botonEliminar); 
    //Añade el tweet al la lista
    listaTweets.appendChild(li);

    //Añadir a LocalStorage 
    agregarTweetLocalStorage(tweet); 

    const restablecerTexarea = document.getElementById('tweet').value = '';
}

//Eliminar el tweet del DOM
function borrarTweet(e) {
    e.preventDefault();
    if (e.target.className == 'borrar-tweet') {
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);
    }
} 

//Mostrar datos del local storage en la lista
function localStorageListo(){
    let tweets;

    tweets = obtenerTweetsLocalStorage();
    
    tweets.forEach(function(tweet){ 
        const botonEliminar = document.createElement('a');
        botonEliminar.classList = 'borrar-tweet';
        botonEliminar.innerText = 'X';

        //Crear elemento y añadirle el contenido a la lista
        const li = document.createElement('li');
        li.innerText = tweet;
        //Añade el botón de eliminar al tweet
        li.appendChild(botonEliminar); 
        //Añade el tweet al la lista
        listaTweets.appendChild(li);
    });
}

//Agregar el tweet al local storage
function agregarTweetLocalStorage(tweet){
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    //Añadir el nuevo tweet
    tweets.push(tweet);
    //Convertir de string a arreglo para local storage
    localStorage.setItem('tweets', JSON.stringify(tweets));
} 

//Comprobar que haya elementos en el local storage y retorna un arreglo
function obtenerTweetsLocalStorage(){ 
    let tweets;
    //Revisamos los valores del local storage
    if(localStorage.getItem('tweets') == null){ 
        tweets = [];
    }else{ 
        tweets = JSON.parse(localStorage.getItem('tweets'));
    } 

    return tweets;
} 

//Eliminar tweet del local storage
function borrarTweetLocalStorage(tweet){ 
    let tweets, tweetBorrar;
    //Elimina la X del tweet
    tweetBorrar = tweet.substring(0, tweet.length - 1);

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet, index){ 
        if(tweetBorrar == tweet){
            tweets.splice(index, 1);
        }
    });

    localStorage.setItem('tweets', JSON.stringify(tweets));
}