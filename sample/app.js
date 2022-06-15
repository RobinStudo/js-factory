const log = () => {
    console.log('bonjour');
};

const timer = setTimeout(log, 2000);

clearTimeout(timer);

const interval = setInterval(() => {
    console.log('salut');
}, 2000);

clearInterval(interval);