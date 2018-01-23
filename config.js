var config = {};

config.debug = true;
config.urlContext = "/convercommerce/devbot";
config.apiMessages = "https://convocom.eu.ngrok.io/" + config.urlContext + "/messages";
config.msBotAppId = "e2afe9f3-80a3-4089-9e85-82f383ace9cd";
config.msBotAppPassword = "VVCSj4BXu9g5nkWuhQxsZcg";
config.port = 40410; //Listening port for incomming calls
//config.mediaUrl = "https://convocom.eu.ngrok.io/assets/images/";
config.mediaUrl = "https://demo.labs.mastercard.com/apps/convercommerce/chatbot-images/alonso/";
config.witClientToken = "EIZTYHINWHX55AFIST5HPGEVU4PGVITM";

if(process.env.NODE_ENV == 'production') {
    config.debug = false;
    config.apiMessages = "https://alonso-bot.herokuapp.com/alonsobot/messages";
    config.urlContext = "/alonsobot";
    config.msBotAppId = "17a71001-bd81-43b0-92a3-be2aedab9aa0";
    config.msBotAppPassword = "zplfpPJDL5{<dfOFN0130/-";
    config.port = 50620;  //Listening port for incomming calls
}

module.exports = config;