var app={};
app.token='**token**';
app.apiDomain = 'https://api.github.com';
app.username="**username**";
app.userinfo="/users/" + app.username;
app.repos="/repos/" + app.username+ "/**repository**/";
app.pulls=app.repos+"pulls";
app.branch=app.repos+"branches/";
app.color=['#B52E2E','#008103'];
app.single={};
app.single.page='projects.mtvnn.com/issues/';
app.multi={};
app.multi.page='projects.mtvnn.com/projects/';
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

function isMerged(info){
	return info == null ? 0 : 1;
}


function single(e){
	console.log ("-> Single",e);
	// var found=false;
	app.single.title = $('#content h2').first().text().toLowerCase().split(' ');
	app.single.ticket=app.single.title[2].split('#')[1];
	$('#content .issue p.author').first().css('padding-bottom',10)
	$(e.data).each(function(i,pull){
		// console.log(pull)
		if (pull.head.label.indexOf(app.single.ticket)>-1){
			console.log('-> pull request #'+pull.number+' state:'+pull.state+' title:'+pull.title)
			var user=pull.user.html_url.split('/').pop();
			var assignee=(pull.assignee)?pull.assignee.html_url.split('/').pop():"no one";
			if (!app.titleChanged) {
				$('.subject h3').html("<span style='color:"+app.color[isMerged(pull.merged_at)]+"'>"+$('.subject h3').text()+"</span>")
				app.titleChanged=true;
			}
			$('#content .issue p.author').last().after('<p class="author gitpull"><a href='+pull.html_url+' style="color:'+app.color[isMerged(pull.merged_at)]+'">#'+pull.number+' ['+pull.state+(isMerged(pull.merged_at)?' - merged':' - not merged')+'] - '+pull.title+'</a> by <a href='+pull.user.html_url+'>'+user+'</a> assigned to '+(pull.assignee?'<a href='+pull.assignee.html_url+'>':'')+assignee+'</a></p>');
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
	app.issue={};
	$('.issues .id').each(function(i,v){
		$(e.data).each(function(i,pull){
			// console.log(pull)
			if (pull.head.label.indexOf($(v).text())>-1){
				console.log('-> pull request #'+pull.number+' state:'+pull.state+' title:'+pull.title);
				var user=pull.user.html_url.split('/').pop();
				var assignee=(pull.assignee)?pull.assignee.html_url.split('/').pop():"no one";
				$(v).find('a').css({'color':app.color[isMerged(pull.merged_at)], 'font-weight':'bold'}).attr('title','#'+pull.number+' ['+pull.state+(isMerged(pull.merged_at)?' - merged':' - not merged')+'] - '+pull.title+' by '+user+' assigned to '+assignee);
				return false
			}
		})
	})
	if (e.meta.Link[0][1].rel=='next'){
		getUrl(e.meta.Link[0][0])
	}else{
		$('.github_popup').remove()
	}
}
