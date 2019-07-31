$(function () {
    $.ajax({
        url : 'spider/list',
        data : {
            page : 1,
            limit: 200
        },
        dataType:'json',
        success : function(data){
            $("#items").tmpl(data).appendTo('.main');
        }
    });
    $('.main').on('click', 'i.delete', function (e) {
        e.stopPropagation();
        var $this = $(this);
        var $parent = $this.parent();
        var id = $parent.data('id');
        layui.layer.confirm('您确定要删除此爬虫吗？',{
            title : '删除'
        },function(index){
            $.ajax({
                url : 'spider/remove',
                data : {
                    id : id
                },
                success : function(){
                    layui.layer.msg('删除成功',{time : 500},function(){
                        $parent.remove();
                    })
                },
                error : function(){
                    layui.layer.msg('删除失败');
                }
            });
            layui.layer.close(index);
        })
    }).on('click', 'i.cron-edit', function (e) {
        e.stopPropagation();
        var $this = $(this);
        let $parent = $this.parent();
        var id = $parent.data('id');
        layui.layer.prompt({
            title : `为 <span style="color: #1E9FFF">${$parent.data('title')}</span> 设置cron表达式`,
            value : $parent.data('cron') || ''
        },function(value,index){
            $.ajax({
                url : 'spider/cron',
                data : {
                    id : id,
                    cron : value
                },
                success : function(){
                    layui.layer.msg('修改成功',{time : 500},function(){
                    })
                },
                error : function(){
                    layui.layer.msg('修改失败')
                }
            });
            layui.layer.close(index);
        });
    }).on('click', 'i.status-enable,i.status-disable', function (e) {
        e.stopPropagation();
        var $this = $(this);
        let $parent = $this.parent();
        var id = $parent.data('id');
        var url = 'start';
        if ($this.hasClass('status-enable')){
            url = 'stop';
        }
        $this.removeClass('status-enable');
        $this.removeClass('status-disable');
        $this.addClass('status-enabling');
        setTimeout(function () {
            $.ajax({
                url : 'spider/' + url,
                data : {
                    id : id
                },
                success : function(){
                    $this.removeClass('status-enabling');
                    if (url == 'start') {
                        $this.addClass('status-enable');
                        $this.attr('title', '已启用');
                    } else {
                        $this.addClass('status-disable');
                        $this.attr('title', '未启用');
                    }
                },
                error : function(x){
                    if (x.status === 500) {
                        layui.layer.msg('操作失败<br>' + x.responseJSON.message);
                    } else {
                        layui.layer.msg('操作失败');
                    }
                    $this.removeClass('status-enabling');
                    if (url == 'start') {
                        $this.addClass('status-disable');
                    } else {
                        $this.addClass('status-enable');
                    }
                }
            });
        }, 400);
    }).on('click', '.item', function (e) {
        var $this = $(this);
        location.href = 'editor.html?id=' + $this.data('id');
    });
    $('#create').click(function () {
        setTimeout(function () {
            location.href = 'editor.html';
        }, 200);
    });
    $('ul.menus>li').click(function () {
        let $this = $(this);
        $this.siblings().removeClass('active');
        $this.addClass('active');
    });
});