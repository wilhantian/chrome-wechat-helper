var main = $('.main');
var helperBtn = `<a style="
    position: absolute;
    top: 28px;
    left: 140px;
    color: white;
    font-size: 14px;
" id="helper-btn">群发助手</a>`;
main.append(helperBtn);

var listView = $("#navContact");

var chatFactory = angular.element('html').injector().get('chatFactory');
var confFactory = angular.element('html').injector().get('confFactory');
var accountFactory = angular.element('html').injector().get('accountFactory');
var contactFactory = angular.element('html').injector().get('contactFactory');
var scope = angular.element(listView).scope();
var allContacts = scope.allContacts;

$("#helper-btn").click(function() {
    var allFriend = contactFactory.getAllFriendContact();
    var checkboxs = "";
    for (var i = 0; i < allFriend.length; i++) {
        var friend = allFriend[i];
        var name = friend.getDisplayName();
        var username = friend.UserName;
        checkboxs += `<input class="sba" type="checkbox" value="` + username + `">` + name + `</input><br>`;
    }

    var plane = `
        <div class="plane-mask">
            <button class="close-btn">关闭</button>
            <div class="plane-content" >
                ` + checkboxs + `
            </div>
            <button class="send-btn">下一步</button>
        </div>
    `;
    main.append(plane);

    $(".close-btn").off('click').click(function() {
        $(".plane-mask").remove();
    });

    $(".send-btn").off('click').click(function() {
        var msg = prompt("请输入群发信息\n预定义宏: 姓(_LASTNAME_),姓名(_NAME_),性别称谓(_SEXNAME_)", "_NAME__SEXNAME_:你好");
        if (msg == null) {
            return;
        }

        var checkedboxs = $(".sba:checked");
        for (var i = 0; i < checkedboxs.length; i++) {
            var username = checkedboxs.get(i).value;
            var user = contactFactory.getContact(username);
            var bufMsg = "";
            bufMsg = msg.replace("_NAME_", user.getDisplayName());
            bufMsg = bufMsg.replace("_LASTNAME_", user.getDisplayName()[0] || "");
            bufMsg = bufMsg.replace("_SEXNAME_", user.Sex == 2 ? "女士" : "先生");

            var objmsg = chatFactory.createMessage({
                MsgType: confFactory.MSGTYPE_TEXT,
                Content: bufMsg,
                FromUserName: accountFactory.getUserName(),
                ToUserName: username //TODO
            });
            chatFactory.appendMessage(objmsg);
            chatFactory.sendMessage(objmsg);

            console.log(bufMsg, objmsg);
        }
    });
});