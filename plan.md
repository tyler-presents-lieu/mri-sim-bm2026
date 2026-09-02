# Overview
This project is a simple simulator of magnetic resonance imaging, intended to function as a presentation to introduce and explain the science and signal processing of MRI to a less technical audience. Teaching the broad strokes is more important than detailed technical accuracy.

The core should be a model for hydrogen atoms with the basic behavior NMR and MRI (e.g. natrual frequence depending on magnetic field, relaxation times). We'll want a configurable 2d grid representing the spins of the atoms visually (ranging from 1 atom to ~20). For the default settings shoot for a baseline natural frequency of 0.1 Hz.

The slides of the presentation will be increasingly complex versions of the app to demonstrate more advanced concepts. Although we'll be pre-configuring setups as slides, it'd be nice to retain some interactivity so that I can answer questions on the fly.

I'm currently at burning man, on a chromebook. Can't depend on access to this codespace, so it'd be nice to make this easy to install on other computers. Thoughts on this? docker, pyinstaller, something else. Either way use pdm for package management.d

# Steps
* Here's an atom it's spin is jittering around randomly, when we turn on a magnetic field, the spin aligns.
* if we shoot an RF pulse at the natural frequency of the atom, it will excite oscillation (show a seqence of rf pulses at increasing frequency s.t. the 3rd pules excites the atom well)
* now we show a line of atoms (horizontally). We apply a magnetic field with gradient and show that we can match rf pulse frequency to local field stregnth, to gain spatial selectivity
* Now we'll go to 2d land with a 10x10 pattern and have x and y gradient that we can play with weaker gradients to demonstrate atoms will precess at slightly different frequencies.
First we'll show the grid in a uniform field to breifly show the uniform precession. Then we'll apply a gentle gradient in x and let it run to show the accumulating phase difference (have it take 3s for the atoms at the farthest extents to go through 2*pi phase shift.)
Then we'll show equal x and y gradients control in 2d
* from here we'll start to get into explaining how the signal measured with a gradient applied is equivalent to a fourier transform but let's not get too bogged down in that now.

# Current Iteration: Focused 2D Gradient Views

- [complete] Keep the isometric view on slides 1-2 only; use paired top-down and phase-color views from slide 3 onward.
- [complete] Move slide 3's field/frequency curve into filled, separate subplots above the spin rows.
- [complete] Open slide 5 with zero x gradient while retaining a visible field/frequency representation once the presenter adjusts it.
- [complete] Reset the grid to a uniform phase whenever either gradient is adjusted on slide 6.

# Current Iteration: Gradient Controls and Field Plots

- [complete] Add a slide 3 x-gradient control ranging from zero to the existing $1/6$ Hz/unit strength, with a zero-gradient default.
- [complete] Add a presenter-triggered RF pulse command to slide 3.
- [complete] Replace embedded field bars with a third, dedicated field/frequency plot on slides 3 and 5.
- [complete] Add a directional vector for the adjustable 2D gradient on slide 6.

# Current Iteration: Coherent Position-Selection Signals

- [complete] Make slide 3 phases share one initial phase and vary only with the adjustable gradient.
- [complete] Simplify the slide 3 RF 
pulse trace into a clean, readable waveform.
- [complete] Render combined signal history as a mostly solid filled-area chart.

# Current Iteration: Expanded Signal Bridge

- [complete] Give slide 7 a longer signal history and a taller fixed vertical amplitude scale.
- [complete] Compress slide 7's atom grids to make room for the expanded signal chart.

# Current Iteration: Physically Correct Spatial Selectivity

- [complete] Tie slide 3 atom resonance to the active gradient so zero gradient excites all positions equally.