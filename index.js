/* eslint-disable no-console */
const BASE = "DB: ";
const logStyle = {
  trace: "background: #222; color: #bada55",
  info: "background: #0000FF; color: #FFFFFF",
  warn: "background: #00FFFF; color: #0000FF",
  error: "background: #FF0000; color: #FFFFFF"
};
class Log {
  generateMessage(args, style, color) {
    let argLen = args.length;
    // to block out all other logs unless specific color
    if (
      process &&
      process.env &&
      process.env.LOG_COLOR &&
      color &&
      color.toLowerCase &&
      color.toLowerCase() !== process.env.LOG_COLOR
    ) {
      return;
    }
    if (color) {
      color = `background: ${color}; color: #FFFFFF`;
      argLen--;
    }
    let isChrome = !!window.chrome;
    for (var i = 0; i < argLen; i++) {
      let obj = args[i];
      if (typeof obj === "string" && isChrome) {
        obj = "%c" + BASE + obj;
        console.log(obj, color || style);
      } else {
        if (obj) {
          if (obj.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(
              "Request was made but an unsuccessful response was returned"
            );
            console.log(obj.response.data);
            console.log(obj.response.status);
            console.log(obj.response.headers);
          } else if (obj.request) {
            // object has response data in request
            console.log("The response", obj.request.response);
            console.log("Status:", obj.request.status);
          } else if (obj.message) {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", obj.message);
          } else {
            console.log(obj);
          }
        }
      }
    }
  }
  color() {
    try{
    if (process.env.LOG_LEVEL === "dev") {
      let color = arguments[arguments.length - 1];
      this.generateMessage(arguments, logStyle.trace, color);
    }} catch {
      this.generateMessage(arguments, logStyle.trace, color);
    }
  }
  trace() {
    try{
    if (process.env.LOG_LEVEL === "dev") {
      this.generateMessage(arguments, logStyle.trace);
    }} catch {
      this.generateMessage(arguments, logStyle.trace);
    }
  }
  info() {
    this.generateMessage(arguments, logStyle.info);
  }
  warn() {
    this.generateMessage(arguments, logStyle.warn);
  }
  error() {
    this.generateMessage(arguments, logStyle.error);
  }
}

export default new Log();
