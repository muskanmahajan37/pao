import {Component, OnInit} from '@angular/core';
import {PaoLexer} from "../parser/PaoLexer";
import {PaoParser} from "../parser/PaoParser";
import {CharStreams, CommonTokenStream} from "antlr4ts";
import {ParseTreeListener, ParseTreeWalker} from "antlr4ts/tree";
import {PaoGrammarListener} from "./PaoGrammarListener";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.less']
})
export class EditorComponent implements OnInit {
  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  code: any = `
系统名称:庖丁解牛系统

领域事件:a
决策命令:a
领域名词:a
出规则:rule 1, rule 2, rule 3

入规则:rule 1
领域事件: b
决策命令:b
领域名词:b

字段: [
名称: Phodal
]`;

  ngOnInit() {
    this.renderGraph()
  }

  renderGraph() {
    let inputStream = CharStreams.fromString(this.code);
    let lexer = new PaoLexer(inputStream);
    let tokenStream = new CommonTokenStream(lexer);
    let parser = new PaoParser(tokenStream);
    let tree = parser.compilationUnit();

    const listener = new PaoGrammarListener();
    listener.onFinish(() => {
      let result = listener.getParseResult();
      console.log(result);
    });
    ParseTreeWalker.DEFAULT.walk(listener as ParseTreeListener, tree);
  }
}
