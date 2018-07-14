$(document).ready(function(){
	
	var flag; 
	/*
	flag = 1表示一元运算
	flag = 2表示二元运算
	*/
	
	// 清空两个输入框的输入
	$("#clc").click(function(){
		$("#vector1").val("");
		$("#vector2").val("");
	});
	
	// 是否允许"向量2"输入框有输入
	$("#vector1").click(function(){
		var op = $("input[name='optionsRadiosinline']:checked").val();
		var ops = ["add", "sub", "mul", "div", "max", "min"];
		if (ops.indexOf(op) == -1)
			flag = 1;
		else
			flag = 2;
		
		//文本框"向量2"禁用
		if(flag == 1){
			$("#vector2").val("");
			$("input[type='text']").each(function () {
　　			$("#vector2").attr("disabled", true);
			});
			
		}
		//文本框"向量2"启用
		if(flag == 2){
			$("input[type='text']").each(function () {
　　			$("#vector2").attr("disabled", false);
			});
		}
	});
	
	// 利用tensorflow.js的运算函数，输出计算结果
	$("#result").click(function(){
		
		if(flag == 1){
			var vector1 = $("#vector1").val().split(',').map(Number);
		}
		if(flag == 2){
			var vector1 = $("#vector1").val().toString().split(',').map(Number);
			var vector2 = $("#vector2").val().toString().split(',').map(Number);
			if(vector1.length != vector2.length)
				alert("输入的两个向量长度不一样");
		}
		
		// 利用tensorflow.js的运算函数
		if( flag == 1 || ((flag == 2) && (vector1.length == vector2.length))){
			var op = $("input[name='optionsRadiosinline']:checked").val();
			const pow2 = tf.tensor(2).toInt(); // 计算平方
			const pow3 = tf.tensor(3).toInt(); // 计算三次方
		
			switch (op) // JavaScript的switch结构
			{
				case "add":  // 加法
					res = tf.tensor(vector1).add(tf.tensor(vector2));
					break;
				case "sub":  // 减法
					res = tf.tensor(vector1).sub(tf.tensor(vector2));
					break;
				case "mul":  // 乘法
					res = tf.tensor(vector1).mul(tf.tensor(vector2));
					break;
				case "div":  // 除法
					res = tf.tensor(vector1).div(tf.tensor(vector2));
					break;
				case "max":  // 两个向量中的最大值，element-wise
					res = tf.tensor(vector1).maximum(tf.tensor(vector2));
					break;
				case "min":  // 两个向量中的最小值，element-wise
					res = tf.tensor(vector1).minimum(tf.tensor(vector2));
					break;
				case "abs":  // 绝对值
					res = tf.tensor(vector1).abs();
					break;
				case "sin":  // 正弦函数
					res = tf.tensor(vector1).sin();
					break;
				case "cos":  // 余弦函数
					res = tf.tensor(vector1).cos();
					break;
				case "tan":  // 正切函数
					res = tf.tensor(vector1).tan();
					break;
				case "exp":  // 指数函数，以e为底
					res = tf.tensor(vector1).exp();
					break;
				case "log":  // 对数函数，以e为底
					res = tf.tensor(vector1).log();
					break;
				case "sqrt":  // 平方根
					res = tf.tensor(vector1).sqrt();
					break;
				case "square":  // 平方
					res = tf.tensor(vector1).pow(pow2);
					break;
				case "cubic":  // 三次方
					res = tf.tensor(vector1).pow(pow3);
					break;
				default:
					res = tf.tensor([]);
			}
		    
			
			$("#table").html(""); // 清空原有表格中的数据
			// 输入计算结果
			for(var i=0; i< res.shape; i++){
				$("tr").append("<td>"+res.get(i)+"</td>;");
			}
		}
		
	});
	
});