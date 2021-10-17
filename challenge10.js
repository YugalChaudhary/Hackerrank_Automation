const puppy = require("puppeteer");

let moderators = ["apple1239", "apple1225" , "asus71902" , "fs022057" , "xih0134" , "apple125" , "apple127" , "apple129" , "apple128" , "appi9847"];

async function openBrowser() {
    const browser = await puppy.launch({
        headless : false,
        defaultViewport : false,
        args:[
            '--start-maximized' // we can also use '--start-fullscreen'
        ]
    });
    //
    let pages = await browser.pages();
    let tab = pages[0];

    await tab.goto("https://www.hackerrank.com/auth/login");

    await tab.waitForSelector('[data-analytics="LoginPassword"]' , {
        visible : true
    });

    let username_id = await tab.$("#input-1");
    let password = await tab.$("#input-2");
    let remember_me = await tab.$(".checkbox-input");
    let sign_in = await tab.$('[data-analytics="LoginPassword"]');


    await username_id.type("yugalchaudhary1@gmail.com");
    await password.type("Yugal12345@");
    await remember_me.click();
    await sign_in.click();

    await tab.waitForNavigation({
        waitUntil : "networkidle2"
    });

    // $ gives us only the first occuring for that selector passed
    let profile = await tab.$(".username.text-ellipsis");
    await profile.click();

    // $$ return us the array means full set of values present for particular selector
    let profile_tab_array = await tab.$$(".dropdown-body.dropdown-menu ul li");  
    await profile_tab_array[6].click();
    // gives us time until the next page is opened properly
    await tab.waitForNavigation();
    await tab.waitForSelector(".nav-tabs.nav.admin-tabbed-nav li", {
        visible : true
    });

    let manage_challenge_array = await tab.$$(".nav-tabs.nav.admin-tabbed-nav li");
    await manage_challenge_array[1].click();

    for (let i = 1 ; i <= 10 ; i++) {
        await tab.waitForSelector(".btn.btn-green.backbone.pull-right", {
            visible : true
        });
    
        let createChallengeButton = await tab.$(".btn.btn-green.backbone.pull-right");
        await createChallengeButton.click();
    
        await tab.waitForSelector("#input_format-container .CodeMirror-code", {
            visible : true
        });
    
        let challengeNameInput = await tab.$("#name");
        let challengeDiscription = await tab.$("#preview");
    
        await challengeNameInput.type("challenge " + i);
        await challengeDiscription.type("Do it");
    
        let codeTextAreas = await tab.$$(".CodeMirror-code");
    
        let informatTextArea = await tab.$("#input_format-container .CodeMirror-code");
        await informatTextArea.click();
        await informatTextArea.type("kjdsbf");
      
        // It will scroll our page to the height of our screen
        // we have used this so there is no mis-typing
        await tab.evaluate( () => {
            window.scrollBy(0, window.innerHeight);
        });
    
        for (let i in codeTextAreas) {
            if (i != 1) {
                await codeTextAreas[i].click();
                await codeTextAreas[i].type("Hello");
            }
        }

        if (i == 1) {
            await tab.waitForSelector("#tags_tagsinput" , {
                visible : true
            });
    
            let tabTextArea = await tab.$("#tags_tagsinput");
            await tabTextArea.click();
            await tabTextArea.type("Hello");
            await tab.keyboard.press("Enter");
        }
        else {
            await tab.waitForSelector(".tagsinput .ui-autocomplete-input" , {
                visible : true
            });
            let tabTextArea = await tab.$(".tagsinput .ui-autocomplete-input");
            await tabTextArea.click();
            await tabTextArea.type("Hello");
            await tab.keyboard.press("Enter");
        }
    
        let saveChangesButton = await tab.$(".save-challenge.btn.btn-green");
        await saveChangesButton.click();
    
        await tab.waitForSelector(".nav-tabs.nav.admin-tabbed-nav.row li a", {
            visible : true
        })
    
        let moderate_array = await tab.$$(".nav-tabs.nav.admin-tabbed-nav.row li a");
        await moderate_array[1].click();
    
        await tab.waitForSelector("#moderator" , {
            visible : true
        });
    
        let moderatorTextArea = await tab.$("#moderator");
    
        for (let moderator of moderators) {
            await moderatorTextArea.type(moderator);
            await tab.keyboard.press("Enter");
        }
    
        await tab.waitForSelector(".save-challenge.btn.btn-green");
        saveChangesButton = await tab.$(".save-challenge.btn.btn-green");
        await saveChangesButton.click();
    
        await tab.waitForSelector(".pull-left.mdT.msB.pjT.bcrumb li" , {
            visible : true
        });
    
        await tab.waitForTimeout(3000);
        let back = await tab.$$(".pull-left.mdT.msB.pjT.bcrumb li");
        await back[0].click();
    }
}
openBrowser();