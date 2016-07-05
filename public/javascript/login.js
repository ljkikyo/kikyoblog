    $=function(el){
        return document.querySelector(el);
    }
    $$=function(el){
        return document.querySelectorAll(el);
    }

   function addEventHandler(ele,type,handler){
      if(ele.addEventListener){
        ele.addEventListener(type,handler,false);
      }else if(ele.attachEvent){
        ele.attachEvent("on"+type,handler);
      }else{
        ele["on"+type]=handler;
      }
    }


window.onload=function(){
    /*success,error显示*/
    var msg=$('.message');
    setTimeout(function(){
        msg.style.display="none";
    },2000);

    /*aside li改变样式*/
    var lis=document.getElementById('aside').getElementsByTagName('a');
    var index = 0;//默认第一个菜单项
    var url = window.location.href.split('?')[0].split('/').pop();
        //取当前URL最后一个 / 后面的文件名

    if(url){//如果有取到, 则进行匹配, 否则默认为首页(即index的值所指向的那个)
        for (var i=lis.length;i--;) {//遍历 li 的中连接地址
            if(lis[i].href.indexOf(url) !== -1){
                index = i;
                break;
            }
        }
    }
    lis[index].className = 'active';

        /*表单验证*/
        var inputEles = [$('#ip1'), $('#ip2'), $('#ip3'), $('#ip4')];
        var originTip = ['必填，长度为4-16个字符', '必填，6到16位数字和字母', '重复输入密码', 'example@haha.com'];

        var checkResult={
            right:false,
            tip:''
        };
			function checkValue(ele){
			var str=ele.value.trim();
			if(str.length===0){
				checkResult.right=false;
				checkResult.tip='输入不能为空';
				return;
			}
			if(ele===inputEles[0]){
				var len=str.replace(new RegExp('[\u4e00-\u9fa5]','g'),'aa').length;
				if (len >= 4 && len <= 16) {
                checkResult.right = true;
                checkResult.tip = '名称可用';
            } else {
                checkResult.right = false;
                checkResult.tip = '请检查名称字符数';
            }

			}
			if(ele===inputEles[1]){
				if(str.match(/^[a-zA-Z0-9]{6,16}$/)){
					checkResult.right=true;
					checkResult.tip='密码格式正确';
				}else {
                checkResult.right = false;
                checkResult.tip = '请输入6到16位字符且只能为数字和字母';
            }

			}
			if (ele === inputEles[2]) {
            if (str === inputEles[1].value.trim()) {
                checkResult.right = true;
                checkResult.tip = '密码正确';
            } else {
                checkResult.right = false;
                checkResult.tip = '两次密码输入要相同';
            }
        }
        if (ele === inputEles[3]) {
            var reg = new RegExp('^([a-zA-Z0-9_\.\-])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$', 'i');
            if (str.match(reg)) {
                checkResult.right = true;
                checkResult.tip = '邮箱可用';
            } else {
                checkResult.right = false;
                checkResult.tip = '邮箱格式错误';
            }
        }
		}

		for (var i = 0; i < inputEles.length; i++) {
        inputEles[i].addEventListener('blur', function(e) {
            checkValue(e.target);
            var span = e.target.parentElement.getElementsByTagName('span')[0];
            span.innerHTML = checkResult.tip;
            if (checkResult.right) {
                e.target.style.border = '2px solid green';
                span.style.color = 'green';
            } else {
                e.target.style.border = '2px solid red';
                span.style.color = 'red';
            }
        })
        inputEles[i].addEventListener('focus', function(e) {
            var index = inputEles.indexOf(e.target);
            var span = e.target.parentElement.getElementsByTagName('span')[0];
            span.innerHTML = originTip[index];
            span.style.visibility = 'visible';
            span.style.color = 'gray';
        })
    }
    $('#check').addEventListener('click', function(e) {
        var right = true;
        for (var i = 0; i < inputEles.length; i++) {
            var input = inputEles[i];
            checkValue(input);
            var span = input.parentElement.getElementsByTagName('span')[0];
            span.style.visibility = 'visible';
            span.innerHTML = checkResult.tip;
            if (checkResult.right) {
                input.style.border = '2px solid green';
                span.style.color = 'green';
            } else {
                input.style.border = '2px solid red';
                span.style.color = 'red';
                right = false;
            }
        }
        if (right) {
            alert('提交成功');
        } else {
            alert('提交失败，请检查输入');
        }
    })

    $('#register').addEventListener('click', function(e) {
        var right = true;
        for (var i = 0; i < inputEles.length; i++) {
            var input = inputEles[i];
            checkValue(input);
            var span = input.parentElement.getElementsByTagName('span')[0];
            span.style.visibility = 'visible';
            span.innerHTML = checkResult.tip;
            if (checkResult.right) {
                input.style.border = '2px solid green';
                span.style.color = 'green';
            } else {
                input.style.border = '2px solid red';
                span.style.color = 'red';
                right = false;
            }
        }
        if (right) {
            alert('提交成功');
        } else {
            alert('提交失败，请检查输入');
        }
    })

/*图片显示*/
/*var filenode = document.getElementById("file"); 
var loadImg=document.getElementById('loadImg');
filenode.onchange=function(){
var xhr=new XMLHttpRequest();
    //设置回调，当请求的状态发生变化时，就会被调用  
    xhr.onreadystatechange = function () {
        //等待上传结果,将背景图像设置为tx2.jpg 
        if (xhr.readyState == 1) {
            loadImg.style.backgroundColor = "#666";  
        }  
        //上传成功，返回的文件名，设置到父节点的背景中  
        if (xhr.readyState == 4 && xhr.status == 200) { 
            var path=JSON.parse(xhr.responseText).path;
            loadImg.style.backgroundImage = "url('./public/images/" +path+ "')";  
        }  
    }

    //构造form数据 
    var data= new FormData();  
    data.append("files", filenode.files[0]); 

    //设置请求，true：表示异步  
    xhr.open("post", "/public/images", true);
    //不要缓存  
    //xhr.setRequestHeader("If-Modified-Since", "0");  
    //提交请求  
    xhr.send(data);
    //清除掉，否则下一次选择同样的文件就进入不到onchange函数中了  
    filenode.value = null;    
}*/



}
