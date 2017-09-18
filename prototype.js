function Super(name){
    this.name = name;
    this.colors = ["red", "blue", "green"];
}

Super.prototype.sayName = function(){
    alert(this.name);
}

function Sub(name, age){
    Super.call(this, name);
    this.age = age;
}

Sub.prototype = new Super();

Sub.prototype.sayAge = function(){
    alert(this.age);
}

var sub = new Sub("nick", 29);
sub.colors.push("black");
alert(sub.colors);     // red blue green black
sub.sayName();  //   nick
sub.sayAge();  //29

var sub2 = new sub("lily", 27);
alert(sub2.colors);   // red blue green
sub.sayName();  //   lily
sub.sayAge();  //   27