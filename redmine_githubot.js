var app={};
app.token='4b8acad04cc79e85d74ac37bf36532d4e190434a';
app.apiDomain = 'https://api.github.com';
app.username="**username**";
app.userinfo="/users/" + app.username;
app.repos="/repos/" + app.username+ "/**repository**/";
app.pulls=app.repos+"pulls";
app.branch=app.repos+"branches/";
app.color={'open':'#B52E2E', 'closed':'#366B02'};
app.single={};
app.single.page='**active_url**';
app.multi={};
app.multi.page='**active_url**';
app.popup="<div class='github_popup' style='position:absolute; left:35%; top:15%; background-color:rgba(0,0,0,.7); color:#fff; padding:30px; font-size:20px;'>Loading Github Pull Requests</div>"

$('body').append(app.popup);
if (window.location.href.indexOf(app.single.page)>-1){
	app.page="single";
}

if (window.location.href.indexOf(app.multi.page)>-1){
	app.page="multi";

}

getUrl();
function getUrl(giturl){
	if (!giturl) giturl=app.apiDomain+app.pulls+'?callback='+app.page+'&access_token='+app.token+'&state=all&per_page=50';
	$.ajax({
		url:giturl,
		dataType:'script'
	});
}


function single(e){
	// console.log ("-> Single",e);
	// var found=false;
	app.single.title = $('#content h2').first().text().toLowerCase().split(' ');
	app.single.ticket=app.single.title[2].split('#')[1];
	$(e.data).each(function(i,pull){
		// console.log(pull)
		if (pull.head.label.indexOf(app.single.ticket)>-1){
			console.log('-> pull request #'+pull.number+' state:'+pull.state+' title:'+pull.title)
			var user=pull.user.html_url.split('/').pop();
			var assignee=(pull.assignee)?pull.assignee.html_url.split('/').pop():"no one";
			$('.subject h3').html("<span style='color:"+app.color[pull.state]+"'>"+$('.subject h3').text()+"</span>")
			$('#content .issue .author').first().css('padding-bottom',10).after('<p class="author"><a href='+pull.html_url+'>#'+pull.number+' ['+pull.state+'] - '+pull.title+'</a> by <a href='+pull.user.html_url+'>'+user+'</a> assigned to '+(pull.assignee?'<a href='+pull.assignee.html_url+'>':'')+assignee+'</a></p>');
			// found=true;
		}
	})
	if (/*!found && */e.meta.Link[0][1].rel=='next'){
		getUrl(e.meta.Link[0][0])
	}else{
	 	$('.github_popup').remove()
	}
}

function multi(e){
	// console.log ("-> Multi",e);
	$('.issues .id').each(function(i,v){
		$(e.data).each(function(i,pull){
			// console.log(pull)
			if (pull.head.label.indexOf($(v).text())>-1){
				console.log('-> pull request #'+pull.number+' state:'+pull.state+' title:'+pull.title);
				$(v).find('a').css({'color':app.color[pull.state], 'font-weight':'bold'});
			}
		})
	})
	if (e.meta.Link[0][1].rel=='next'){
		getUrl(e.meta.Link[0][0])
	}else{
		$('.github_popup').remove()
	}
}
