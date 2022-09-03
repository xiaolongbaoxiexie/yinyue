/*
1:歌曲搜索接口
请求地址:https://autumnfish.cn/search
请求方法:get
请求参数:keywords(查询关键字)
响应内容:歌曲搜索结果

2:歌曲url获取
请求地址:https://autumnfish.cn/song/url             接口失效,需要验证
请求方法:get
请求参数:id(歌曲id)
响应内容:歌曲url地址

3.歌曲详情获取
请求地址: https://autumnfish.cn/song/detail        接口失效
请求方法: get
请求参数:ids(歌曲id)
响应内容:歌曲详情(包括封面信息)

4.热门评论获取
请求地址:https://autumnfish.cn/comment/hot?type=0
请求方法:get
请求参数:id(歌曲id,地址中的type固定为0)
响应内容:歌曲的热门评论 

5.mv地址获取
请求地址:https://autumnfish.cn/mv/url               接口失效,需要验证
请求方法:get
请求参数:id(mvid,为0表示没有mv)
响应内容:mv的地址
*/

var abb=new Vue({
    el:"#musicPlayer",
    data:{
        query:"",//查询的信息
        //歌曲数组
        musicList:[],
        
        musicId:"",
        //歌曲地址
        musicUrl:"",
        //歌曲封面
        musicCover:"",
        //歌曲评论
        hotComments:[],
        //动画播放状态
        isPlaying:false,
        
    },
    methods:{
        searchMusic:function(musicId) {
            var that=this;
            //获取歌曲地址
            axios.get("https://autumnfish.cn/search?keywords=0"+this.query)
            .then(function (response) {
                console.log(response.data.result.songs);
                that.musicList=response.data.result.songs
            },function (err) {
                console.log(err);
            });
            
        },
        
        playMusic:function (musicId) {
            console.log(musicId);
            var that=this;
            
            /*
            axios.get("https://autumnfish.cn/song/url?id="+musicId)
            .then(function (response) {
                console.log(response.data.data.url);
                that.musicUrl=response.data.data.url;
            },function (err) {
                console.log(err);
            });
            */
            this.musicId=musicId;
            
            //歌曲详情获取
            axios.get("https://autumnfish.cn/song/detail?ids="+musicId)
            .then(function (response) {
                console.log(response.data);
                //that.musicList=response.data.result.songs
            },function (err) {
                console.log(err);
            });

            //歌曲评论获取
            axios.get("https://autumnfish.cn/comment/hot?type=0&id="+musicId)
            .then(function (response) {
                console.log(response.data.hotComments);
                that.hotComments = response.data.hotComments;
            },function (err) {
                console.log(err);
            });
        },
        
        //用@play监听音频的开始，执行play
        play:function() {
            this.isPlaying=true;
        },
        //用@pause监听音频的结束，执行pause
        pause:function() {
            this.isPlaying=false;
        },
        
        playMV: function(mvid) {
            var that = this;
            axios.get("https://autumnfish.cn/mv/url?id=" + mvid).then(
              function(response) {
                 console.log(response);
                
                //that.isShow = true;
                //that.mvUrl = response.data.data.url;
              },
              function(err) {}
            );
          },
    }
})