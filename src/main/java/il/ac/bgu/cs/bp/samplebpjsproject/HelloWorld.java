package il.ac.bgu.cs.bp.samplebpjsproject;

import il.ac.bgu.cs.bp.bpjs.execution.BProgramRunner;
import il.ac.bgu.cs.bp.bpjs.execution.listeners.PrintBProgramRunnerListener;
import il.ac.bgu.cs.bp.bpjs.model.BProgram;
import il.ac.bgu.cs.bp.bpjs.model.ResourceBProgram;

/**
 * Simple class running a BPjs program that plays 7-Boom game.
 */
public class HelloWorld {
    
    public static void main(String[] args) {

        // This will load the program file  <Project>/src/main/resources/HelloBPjsWorld.js
        final BProgram bprog = new ResourceBProgram("HelloBPjsWorld.js");
        
        BProgramRunner rnr = new BProgramRunner(bprog);

        // Print program events to the console
        rnr.addListener( new PrintBProgramRunnerListener() );
        
        // go!
        rnr.run();
    }
    
}
