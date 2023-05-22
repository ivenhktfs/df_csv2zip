/**
 * Created by Aravind.Mohanoor on 4/12/2016.
 */
window.totalColumns = 0;
var stop_words = new Array(
    'a', 'about', 'above', 'across', 'after', 'again', 'against', 'all', 'almost', 'alone', 'along', 'already', 'also', 'although', 'always', 'among', 'an', 'and', 'another', 'any', 'anybody', 'anyone', 'anything', 'anywhere', 'are', 'area', 'areas', 'around', 'as', 'ask', 'asked', 'asking', 'asks', 'at', 'away', 'b', 'back', 'backed', 'backing', 'backs', 'be', 'became', 'because', 'become', 'becomes', 'been', 'before', 'began', 'behind', 'being', 'beings', 'best', 'better', 'between', 'big', 'both', 'but', 'by', 'c', 'came', 'can', 'cannot', 'case', 'cases', 'certain', 'certainly', 'clear', 'clearly', 'come', 'could', 'd', 'did', 'differ', 'different', 'differently', 'do', 'does', 'done', 'down', 'down', 'downed', 'downing', 'downs', 'during', 'e', 'each', 'early','eg','either', 'end', 'ended', 'ending', 'ends', 'enough', 'even', 'evenly', 'ever', 'every', 'everybody', 'everyone', 'everything', 'everywhere', 'f', 'face', 'faces', 'fact', 'facts', 'far', 'felt', 'few', 'find', 'finds', 'first', 'for', 'four', 'from', 'full', 'fully', 'further', 'furthered', 'furthering', 'furthers', 'g', 'gave', 'general', 'generally', 'get', 'gets', 'give', 'given', 'gives', 'go', 'going', 'good', 'goods', 'got', 'great', 'greater', 'greatest', 'group', 'grouped', 'grouping', 'groups', 'h', 'had', 'has', 'have', 'having', 'he', 'her', 'here', 'herself', 'high', 'high', 'high', 'higher', 'highest', 'him', 'himself', 'his', 'how', 'however', 'i', 'if', 'important', 'in', 'interest', 'interested', 'interesting', 'interests', 'into', 'is', 'it', 'its', 'itself', 'j', 'just', 'k', 'keep', 'keeps', 'kind', 'knew', 'know', 'known', 'knows', 'l', 'large', 'largely', 'last', 'later', 'latest', 'least', 'less', 'let', 'lets', 'like', 'likely', 'long', 'longer', 'longest', 'm', 'made', 'make', 'making', 'man', 'many', 'may', 'me', 'member', 'members', 'men', 'might', 'more', 'most', 'mostly', 'mr', 'mrs', 'much', 'must', 'my', 'myself', 'n', 'necessary', 'need', 'needed', 'needing', 'needs', 'never', 'new', 'new', 'newer', 'newest', 'next', 'no', 'nobody', 'non', 'noone', 'not', 'nothing', 'now', 'nowhere', 'number', 'numbers', 'o', 'of', 'off', 'often', 'old', 'older', 'oldest', 'on', 'once', 'one', 'only', 'open', 'opened', 'opening', 'opens', 'or', 'order', 'ordered', 'ordering', 'orders', 'other', 'others', 'our', 'out', 'over', 'p', 'part', 'parted', 'parting', 'parts', 'per', 'perhaps', 'place', 'places', 'point', 'pointed', 'pointing', 'points', 'possible', 'present', 'presented', 'presenting', 'presents', 'problem', 'problems', 'put', 'puts', 'q', 'quite', 'r', 'rather', 'really', 'right', 'right', 'room', 'rooms', 's', 'said', 'same', 'saw', 'say', 'says', 'second', 'seconds', 'see', 'seem', 'seemed', 'seeming', 'seems', 'sees', 'several', 'shall', 'she', 'should', 'show', 'showed', 'showing', 'shows', 'side', 'sides', 'since', 'small', 'smaller', 'smallest', 'so', 'some', 'somebody', 'someone', 'something', 'somewhere', 'state', 'states', 'still', 'still', 'such', 'sure', 't', 'take', 'taken', 'than', 'that', 'the', 'their', 'them', 'then', 'there', 'therefore', 'these', 'they', 'thing', 'things', 'think', 'thinks', 'this', 'those', 'though', 'thought', 'thoughts', 'three', 'through', 'thus', 'to', 'today', 'together', 'too', 'took', 'toward', 'turn', 'turned', 'turning', 'turns', 'two', 'u', 'under', 'until', 'up', 'upon', 'us', 'use', 'used', 'uses', 'v', 'very', 'w', 'want', 'wanted', 'wanting', 'wants', 'was', 'way', 'ways', 'we', 'well', 'wells', 'went', 'were', 'what', 'when', 'where', 'whether', 'which', 'while', 'who', 'whole', 'whose', 'why', 'will', 'with', 'within', 'without', 'work', 'worked', 'working', 'works', 'would', 'x', 'y', 'year', 'years', 'yet', 'you', 'young', 'younger', 'youngest', 'your', 'yours', 'z', '-----', 'don\'t', 'can\'t', 'it\'s','i\'m','+','doesn\'t'
);
$(function () {
    // The event listener for the file upload
    document.getElementById('txtFileUpload').addEventListener('change', upload, false);

    $('#btnDownload').hide();

    $("#btnDownload").on('click',function(){
        if(window.zipObject){
            downloadZIPFile();
        }
        else{
            alert('There was an error creating the ZIP file');
        }
    });

    $("#btnMap").on('click',function(){
        var mapVal = $("#category").val();
        var csvData = window.csvData;
        window.csvData = csvData;
        var countUncategorized = 0;
        $("#csvTable > tbody > tr").each(function(){
            if($(this).attr('id')!=='tr_-1'){
                if($(this).is(":visible")){
                    var rowidattr = $(this).attr('id');
                    var rowid = parseInt(rowidattr.split('_')[1]);
                    $(this).find('td:eq('+window.totalColumns+')').text(mapVal);
                    var dataRow = csvData[rowid+1];
                    if(mapVal !==''){
                        dataRow[window.totalColumns]=mapVal;
                    }
                }
                var currCat = $(this).find('td:eq('+window.totalColumns+')').text();
                if(currCat.toLowerCase() === 'Uncategorized'.toLowerCase()){
                    countUncategorized += 1;
                }
            }
        });
        console.log('uncat = '+countUncategorized);
        $("#lblUncategorizedCount").text('Total rows:'+window.csvData.length +' Uncategorized rows: '+countUncategorized);
        generateWordCloud();
    });

    // Method that checks that the browser supports the HTML5 File API
    function browserSupportFileUpload() {
        var isCompatible = false;
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            isCompatible = true;
        }
        return isCompatible;
    }

    // Method that reads and processes the selected file
    function upload(evt) {
        if (!browserSupportFileUpload()) {
            alert('The File APIs are not fully supported in this browser!');
        } else {
            var data = null;
            var file = evt.target.files[0];
            var reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function(event) {
                var csvData = event.target.result;
                data = $.csv.toArrays(csvData);
                window.csvData = data;
                if (data && data.length > 0) {
                    display(data);
                    //refreshTable(data,true);
                } else {
                    //alert('No data to import!');
                }
            };
            reader.onerror = function() {
                alert('Unable to read ' + file.fileName);
            };
        }
    }
});

function display(data){
    $('#csvTable').html('');
    var lang = $('#language').val();
    if(lang === '') lang = 'en';
    window.lang = lang;
    window.zipObject = null;
    var firstRow = data[0];
    var tHead = $('<thead/>');
    tHead.addClass('thead-dark');
    var tbody = $('<tbody/>');
    var zip = new JSZip();

    var packageJSON = generatePackageJSON();
    zip.file('package.json',JSON.stringify(packageJSON));
    var intentsFolder = zip.folder('intents');
    var fourColumnFormat = false;
    var eightColumnFormat = false;
    if (firstRow.length === 2){
        //2 column format
        $(data).each(function(index,value){
            var tr = $('<tr/>',{
                id:'tr_'+(index-1)
            });
            if(index === 0){
                var rowData=data[index];
                var header1 = rowData[0];
                var header2 = rowData[1];
                var tdHeader1 = $('<th/>',{
                    html:header1
                });
                tr.append(tdHeader1);
                var tdHeader2 = $('<th/>',{
                    html:header2
                });
                tr.append(tdHeader2);
                tHead.append(tr);
            }
            else{
                var rowData = data[index];
                var query = rowData[0];
                var response = rowData[1];
                var tdQuery = $('<td/>',{
                    html:query
                });
                tr.append(tdQuery);
                var tdResponse = $('<td/>',{
                    html:response
                });
                tr.append(tdResponse);
                var intentName = getSlug(query, {separator: '_', truncate:100});
                var requestJSON = generateRequestJSON(query);
                var responseJSON = generateResponseJSON(response, intentName);
                //var userSaysFileName = intentName+'_usersays_en.json';
                var userSaysFileName = intentName+'_usersays_'+lang+'.json';
                var responseFileName = intentName+'.json';
                intentsFolder.file(userSaysFileName,JSON.stringify(requestJSON));
                intentsFolder.file(responseFileName,JSON.stringify(responseJSON));
                tbody.append(tr);
            }
        });
    }
    else if (firstRow.length === 4){
        fourColumnFormat = true;
        var userSaysArray = {};
        var agentResponsesArray = {};
        var intentNameArray = {};
        
        //4 column format
        $(data).each(function(index,value){
            var tr = $('<tr/>',{
                id:'tr_'+(index-1)
            });
            if(index === 0){
                var rowData=data[index];
                var header1 = rowData[0];
                var header2 = rowData[1];
                var header3 = rowData[2];
                var header4 = rowData[3];
                var tdHeader1 = $('<th/>',{
                    html:header1
                });
                tr.append(tdHeader1);
                var tdHeader2 = $('<th/>',{
                    html:header2
                });
                tr.append(tdHeader2);
                var tdHeader3 = $('<th/>',{
                    html:header3
                });
                tr.append(tdHeader3);
                var tdHeader4 = $('<th/>',{
                    html:header4
                });
                tr.append(tdHeader4);
                tHead.append(tr);
            }
            else{
                var rowData = data[index];

                var intentid = parseInt(rowData[0]);
                var intentName = rowData[1];
                var query = rowData[2];
                var response = rowData[3];


                if(userSaysArray.hasOwnProperty(intentid)){
                    if(!query.isEmpty()){
                        userSaysArray[intentid].push(query);
                    }
                }
                else{
                    userSaysArray[intentid] = [];
                    if(!query.isEmpty()){
                        userSaysArray[intentid].push(query);
                    }
                }

                if(agentResponsesArray.hasOwnProperty(intentid)){
                    if(!response.isEmpty()){
                        agentResponsesArray[intentid].push(response);
                    }
                }
                else{
                    agentResponsesArray[intentid] = [];
                    if(!response.isEmpty()){
                        agentResponsesArray[intentid].push(response);
                    }
                }

                if(!intentNameArray.hasOwnProperty(intentid)){
                    intentNameArray[intentid]=intentName;
                }

                var tdIntentID = $('<td/>',{
                    html:intentid
                });
                tr.append(tdIntentID);
                var tdIntentName = $('<td/>',{
                    html:intentName
                });
                tr.append(tdIntentName);
                var tdQuery = $('<td/>',{
                    html:query
                });
                tr.append(tdQuery);
                var tdResponse = $('<td/>',{
                    html:response
                });
                tr.append(tdResponse);
                tbody.append(tr);
            }
        });
    }
    else if (firstRow.length === 8){
        eightColumnFormat = true;
        var userSaysArray = {};
        var agentResponsesArray = {};
        var intentNameArray = {};
        var actionArray = {};
        var inputContextArray = {};
        var outputContextArray = {};
        var outputContextLifespanArray = {};

        //8 column format
        $(data).each(function(index,value){
            var tr = $('<tr/>',{
                id:'tr_'+(index-1)
            });
            if(index === 0){
                var rowData=data[index];
                var header1 = rowData[0];
                var header2 = rowData[1];
                var header3 = rowData[2];
                var header4 = rowData[3];
                var header5 = rowData[4];
                var header6 = rowData[5];
                var header7 = rowData[6];
                var header8 = rowData[7];
                var tdHeader1 = $('<th/>',{
                    html:header1
                });
                tr.append(tdHeader1);
                var tdHeader2 = $('<th/>',{
                    html:header2
                });
                tr.append(tdHeader2);
                var tdHeader3 = $('<th/>',{
                    html:header3
                });
                tr.append(tdHeader3);
                var tdHeader4 = $('<th/>',{
                    html:header4
                });
                tr.append(tdHeader4);
                var tdHeader5 = $('<th/>',{
                    html:header5
                });
                tr.append(tdHeader5);
                var tdHeader6 = $('<th/>',{
                    html:header6
                });
                tr.append(tdHeader6);
                var tdHeader7 = $('<th/>',{
                    html:header7
                });
                tr.append(tdHeader7);
                var tdHeader8 = $('<th/>',{
                    html:header8
                });
                tr.append(tdHeader8);
                tHead.append(tr);
            }
            else{
                var rowData = data[index];

                var intentid = parseInt(rowData[0]);
                var intentName = rowData[1];
                var query = rowData[2];
                var response = rowData[3];
                var action = rowData[4];
                var inputContext = rowData[5];
                var outputContext = rowData[6];
                var outputContextLifespan = rowData[7];

                if(userSaysArray.hasOwnProperty(intentid)){
                    if(!query.isEmpty()){
                        userSaysArray[intentid].push(query);
                    }
                }
                else{
                    userSaysArray[intentid] = [];
                    if(!query.isEmpty()){
                        userSaysArray[intentid].push(query);
                    }
                }

                if(agentResponsesArray.hasOwnProperty(intentid)){
                    if(!response.isEmpty()){
                        agentResponsesArray[intentid].push(response);
                    }
                }
                else{
                    agentResponsesArray[intentid] = [];
                    if(!response.isEmpty()){
                        agentResponsesArray[intentid].push(response);
                    }
                }

                if(!intentNameArray.hasOwnProperty(intentid)){
                    intentNameArray[intentid]=intentName;
                }

                if(!actionArray.hasOwnProperty(intentid)){
                    actionArray[intentid]=action;
                }

                if(inputContextArray.hasOwnProperty(intentid)){
                    if(!inputContext.isEmpty()){
                        inputContextArray[intentid].push(inputContext);
                    }
                }
                else{
                    inputContextArray[intentid] = [];
                    if(!inputContext.isEmpty()){
                        inputContextArray[intentid].push(inputContext);
                    }
                }

                if(outputContextArray.hasOwnProperty(intentid)){
                    if(!outputContext.isEmpty()){
                        outputContextObj = {};
                        outputContextObj['name']=outputContext;
                        outputContextObj['lifespan']= outputContextLifespan;
                        outputContextArray[intentid].push(outputContextObj);
                    }
                }
                else{
                    outputContextArray[intentid] = [];
                    if(!outputContext.isEmpty()){
                        outputContextObj = {};
                        outputContextObj['name']=outputContext;
                        outputContextObj['lifespan']= outputContextLifespan;
                        outputContextArray[intentid].push(outputContextObj);
                    }
                }

                var tdIntentID = $('<td/>',{
                    html:intentid
                });
                tr.append(tdIntentID);
                var tdIntentName = $('<td/>',{
                    html:intentName
                });
                tr.append(tdIntentName);
                var tdQuery = $('<td/>',{
                    html:query
                });
                tr.append(tdQuery);
                var tdResponse = $('<td/>',{
                    html:response
                });
                tr.append(tdResponse);
                var tdAction = $('<td/>',{
                    html:action
                });
                tr.append(tdAction);
                var tdInputContext = $('<td/>',{
                    html:inputContext
                });
                tr.append(tdInputContext);
                var tdOutputContext = $('<td/>',{
                    html:outputContext
                });
                tr.append(tdOutputContext);
                var tdOutputContextLifespan = $('<td/>',{
                    html:outputContextLifespan
                });
                tr.append(tdOutputContextLifespan);
                tbody.append(tr);
            }
        });
    }
    if(fourColumnFormat){
        $.each(userSaysArray,function(index,value){
            var userSays = userSaysArray[index];
            var textResponses = agentResponsesArray[index];
            var intentName = intentNameArray[index];

            var requestArrayJSON = generateRequestArrayJSON(userSays);
            var responseArrayJSON = generateResponseArrayJSON(textResponses,intentName);

            //var userSaysFileName = intentName+'_usersays_en.json';
            var userSaysFileName = intentName+'_usersays_'+lang+'.json';
            var responseFileName = intentName+'.json';
            intentsFolder.file(userSaysFileName,JSON.stringify(requestArrayJSON));
            intentsFolder.file(responseFileName,JSON.stringify(responseArrayJSON));

        });
    }
    if(eightColumnFormat){
        $.each(userSaysArray,function(index,value){
            var userSays = userSaysArray[index];
            var textResponses = agentResponsesArray[index];
            var intentName = intentNameArray[index];
            var action = actionArray[index];
            var inputContextList = inputContextArray[index];
            var outputContextList = outputContextArray[index];

            var requestArrayJSON = generateRequestArrayJSON(userSays);
            var responseArrayJSON =
                generateResponseArrayJSONFor8ColumnFormat(textResponses,intentName, action, inputContextList,outputContextList);

            //var userSaysFileName = intentName+'_usersays_en.json';
            var userSaysFileName = intentName+'_usersays_'+lang+'.json';
            var responseFileName = intentName+'.json';
            intentsFolder.file(userSaysFileName,JSON.stringify(requestArrayJSON));
            intentsFolder.file(responseFileName,JSON.stringify(responseArrayJSON));

        });
    }
    $('#csvTable').append(tHead);
    $('#csvTable').append(tbody);
    window.zipObject = zip;
    $('#btnDownload').show();
}

function downloadZIPFile(){
    var zip = window.zipObject;
    zip.generateAsync({type:"blob"})
        .then(function(content) {
            // see FileSaver.js
            saveAs(content, "example.zip");
        });
}

function generateRequestJSON(request){
    var strRequest = request.toString();
    var requestArray = [];
    var request = {};
    var data = [];
    var dataMessage = {};
    dataMessage.text = strRequest;
    dataMessage.userDefined = false;
    data.push(dataMessage);
    request.data = data;
    request.isTemplate = false;
    request.count = 0;
    request.updated = 0;
    requestArray.push(request);
    return requestArray;
}

function generateRequestArrayJSON(requestArray){
    var i;
    var requestArrayJSON = [];
    for (i = 0; i < requestArray.length; ++i) {
        var request = requestArray[i];
        var strRequest = request.toString();
        var request = {};
        var data = [];
        var dataMessage = {};
        dataMessage.text = strRequest;
        dataMessage.userDefined = false;
        data.push(dataMessage);
        request.data = data;
        request.isTemplate = false;
        request.count = 0;
        request.updated = 0;
        requestArrayJSON.push(request);
    }
    return requestArrayJSON;
}

function generateResponseJSON(agentResponse, intentName){
    var strAgentResponse = agentResponse.toString();
    var jsonData = {};
    jsonData.name = intentName;
    jsonData.auto = true;
    var responses = [];
    var response = {};
    response.resetContexts = false;
    var messages = [];
    var message = {};
    message.type = 0;
    //message.lang = 'en';
    message.lang = window.lang;
    var speechArray = [];
    speechArray.push(strAgentResponse);
    message.speech = speechArray;
    messages.push(message);
    response.messages = messages;
    responses.push(response);
    jsonData.responses = responses;
    return jsonData;
}

function generateResponseArrayJSON(agentResponseArray,intentName){
    var jsonData = {};
    jsonData.name = intentName;
    jsonData.auto = true;
    var responses = [];
    var response = {};
    response.resetContexts = false;
    var messages = [];
    var message = {};
    message.type = 0;
    //message.lang = 'en';
    message.lang = window.lang;
    var speechArray = [];
    var i;
    for (i = 0; i < agentResponseArray.length; ++i) {
        var agentResponse = agentResponseArray[i];
        var strAgentResponse = agentResponse.toString();
        speechArray.push(strAgentResponse);
    }
    message.speech = speechArray;
    messages.push(message);
    response.messages = messages;
    responses.push(response);
    jsonData.responses = responses;
    return jsonData;
}

function generateResponseArrayJSONFor8ColumnFormat(agentResponseArray,intentName,action, inputContextList,outputContextList){
    var jsonData = {};
    jsonData.name = intentName;
    jsonData.auto = true;
    var inputContexts = [];
    for (i = 0; i < inputContextList.length; ++i) {
        var inputContext = inputContextList[i];
        inputContexts.push(inputContext);
    }
    jsonData.contexts = inputContexts;

    var responses = [];
    var response = {};
    response.resetContexts = false;
    response.action = action;
    var messages = [];
    var message = {};
    message.type = 0;
    //message.lang = 'en';
    message.lang = window.lang;
    var speechArray = [];
    var i;
    for (i = 0; i < agentResponseArray.length; ++i) {
        var agentResponse = agentResponseArray[i];
        var strAgentResponse = agentResponse.toString();
        speechArray.push(strAgentResponse);
    }
    message.speech = speechArray;
    messages.push(message);
    response.messages = messages;
    responses.push(response);
    var affectedContexts = [];
    for (i = 0; i < outputContextList.length; ++i) {
        var outputContextObjFromInput = outputContextList[i];
        var outputContext = outputContextObjFromInput['name'];
        var outputContextLifespan = outputContextObjFromInput['lifespan'];
        var outputContextObj = {};
        outputContextObj['name']=outputContext;
        outputContextObj['lifespan']=outputContextLifespan;
        outputContextObj['parameters']={};
        affectedContexts.push(outputContextObj);
    }
    response.affectedContexts = affectedContexts;
    jsonData.responses = responses;

    return jsonData;
}

function generatePackageJSON(){
    var packageJSON = {};
    packageJSON.version = '1.0.0';
    return packageJSON;
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

String.prototype.isEmpty = function() {
    return (this.length === 0 || !this.trim());
};