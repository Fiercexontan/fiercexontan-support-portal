import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET - Fetch ticket(s)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const ticketNumber = searchParams.get('ticketNumber');
    const walletAddress = searchParams.get('walletAddress');
    const status = searchParams.get('status');

    let query = supabase.from('tickets').select('*');

    if (ticketNumber) {
      query = query.eq('ticket_number', ticketNumber).single();
    } else if (walletAddress) {
      query = query.eq('wallet_address', walletAddress);
    } else if (status) {
      query = query.eq('status', status);
    }

    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Ticket not found' },
          { status: 404 }
        );
      }
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tickets' },
      { status: 500 }
    );
  }
}

// POST - Create new ticket
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      ticketNumber,
      walletAddress,
      issueType,
      subject,
      description,
      priority = 'normal'
    } = body;

    // Validation
    if (!ticketNumber || !walletAddress || !issueType || !subject || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('tickets')
      .insert([
        {
          ticket_number: ticketNumber,
          wallet_address: walletAddress,
          issue_type: issueType,
          subject,
          description,
          priority,
          status: 'pending',
        }
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating ticket:', error);
    return NextResponse.json(
      { error: 'Failed to create ticket' },
      { status: 500 }
    );
  }
}

// PATCH - Update ticket (for admin use)
export async function PATCH(request) {
  try {
    const body = await request.json();
    const { ticketNumber, status, adminNotes, resolution } = body;

    if (!ticketNumber) {
      return NextResponse.json(
        { error: 'Ticket number is required' },
        { status: 400 }
      );
    }

    const updateData = {
      updated_at: new Date().toISOString(),
    };

    if (status) updateData.status = status;
    if (adminNotes) updateData.admin_notes = adminNotes;
    if (resolution) updateData.resolution = resolution;

    const { data, error } = await supabase
      .from('tickets')
      .update(updateData)
      .eq('ticket_number', ticketNumber)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating ticket:', error);
    return NextResponse.json(
      { error: 'Failed to update ticket' },
      { status: 500 }
    );
  }
}

// DELETE - Delete ticket (for admin use)
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const ticketNumber = searchParams.get('ticketNumber');

    if (!ticketNumber) {
      return NextResponse.json(
        { error: 'Ticket number is required' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('tickets')
      .delete()
      .eq('ticket_number', ticketNumber);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting ticket:', error);
    return NextResponse.json(
      { error: 'Failed to delete ticket' },
      { status: 500 }
    );
  }
}