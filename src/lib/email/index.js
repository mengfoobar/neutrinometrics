const helper = require('sendgrid').mail;
const fs = require('fs');
const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

const path = require('path');

const WelcomeTemplatePath = path.join(global.ROOT_PATH, 'resources', 'welcomeTemplate.html');

let htmlTemplate;

try {
    htmlTemplate = fs.readFileSync(WelcomeTemplatePath,'utf8');
} catch(e) {
    console.log('Error:', e.stack);
}


module.exports={
    sendLoginInfo:function(email, password, projectId){
        if(global.DEV_MODE){
            return Promise.resolve(true)
        }
        else if(!htmlTemplate){
            console.log("Error: unable to detect html template");
            return Promise.resolve(false)
        }

        const body = htmlTemplate.replace( /EMAIL_ADDRESS/g, email).replace(/PROJECT_ID/g, projectId)

        const from_email = new helper.Email("info@neutrinometrics.net")
        const to_email = new helper.Email(email)
        const subject = "Welcome to Neutrino!"
        const content = new helper.Content("text/html", body)
        const mail = new helper.Mail(from_email, subject, to_email, content)

        const request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON()
        });

        return new Promise(function(resolve, reject){
            sg.API(request, function(error, response) {
                if(response.statusCode <300){
                    resolve(true)
                }else{
                    resolve(false)
                }

            })
        })



    }
}